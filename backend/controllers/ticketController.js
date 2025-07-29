import { validationResult } from "express-validator";
import Ticket from "../models/Ticket.js";
import logger from "../utils/logger.js";

// --- CREATE TICKET ---
export async function addTicket(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  // Employees always set themselves as creator; cannot assign to self
  const { title, description, status, priority, assignedTo, dueDate } = req.body;
  if (assignedTo && assignedTo === req.user.employee?.toString()) {
    return res.status(400).json({ message: "Cannot assign ticket to self." });
  }
  try {
    const ticket = new Ticket({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user.employee,
      events: assignedTo ? [{
        field: "assignedTo",
        from: null,
        to: assignedTo,
        changedBy: req.user.employee,
      }] : [],
    });

    await ticket.save();
    logger.info("Ticket created", { ticketId: ticket._id });
    res.status(201).json({ message: "Ticket created successfully", ticket });
  } catch (error) {
    logger.error("Ticket creation failed", { error: error.message });
    res.status(400).json({ message: "Error creating ticket", error: error.message });
  }
}

// --- UPLOAD ATTACHMENTS ---
export async function uploadAttachments(req, res) {
  const { _id } = req.params;
  try {
    const ticket = await Ticket.findById(_id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    const files = req.files || [];
    if (!files.length) return res.status(400).json({ message: "No files uploaded" });
    const attachments = files.map(file => ({
      path: file.path,
      uploadedBy: req.user.employee,
      uploadedAt: new Date()
    }));
    ticket.attachments.push(...attachments);
    await ticket.save();
    res.status(200).json({ message: "Attachments uploaded successfully", attachments });
  } catch (error) {
    logger.error("[Upload Error]", error.message);
    res.status(500).json({ message: "Failed to upload attachments", error: error.message });
  }
}

// --- LIST TICKETS ---
export async function listTickets(req, res) {
  try {
    let tickets;
    if (req.user.role === "admin" || req.user.role === "manager") {
      tickets = await Ticket.find({})
        .populate("createdBy", "personal.firstName personal.lastName")
        .populate("assignedTo", "personal.firstName personal.lastName")
        .sort({ createdAt: -1 });
    } else if (req.user.role === "employee") {
      tickets = await Ticket.find({ createdBy: req.user.employee })
        .populate("createdBy", "personal.firstName personal.lastName")
        .populate("assignedTo", "personal.firstName personal.lastName")
        .sort({ createdAt: -1 });
    }
    res.status(200).json(tickets);
  } catch (error) {
    logger.error("Error fetching tickets", { error: error.message });
    res.status(500).json({ message: "Error fetching tickets", error: error.message });
  }
}

// --- GET SINGLE TICKET ---
export async function getTicketById(req, res) {
  try {
    const ticket = await Ticket.findById(req.params._id)
      .populate("createdBy", "personal.firstName personal.lastName")
      .populate("assignedTo", "personal.firstName personal.lastName")
      .lean();

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    // Employees can only fetch their own tickets
    if (req.user.role === "employee" && ticket.createdBy && ticket.createdBy._id?.toString() !== req.user.employee) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    logger.error("Error fetching ticket", { error: error.message });
    res.status(500).json({ message: "Error fetching ticket", error: error.message });
  }
}

// --- UPDATE TICKET ---
export async function updateTicket(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const ticket = await Ticket.findById(req.params._id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    // --- RBAC logic ---
    if (req.user.role === "employee" && ticket.createdBy.toString() !== req.user.employee) {
      return res.status(403).json({ message: "Access denied" });
    }

    // --- COMMON UPDATE LOGIC ---
    const updates = req.body;
    const events = [];
    ["status", "priority", "assignedTo"].forEach(field => {
      if (updates[field] && updates[field] !== String(ticket[field])) {
        events.push({
          field,
          from: String(ticket[field] || ''),
          to: updates[field],
          changedBy: req.user.employee,
        });
        ticket[field] = updates[field];
      }
    });
    ticket.title = updates.title || ticket.title;
    ticket.description = updates.description || ticket.description;
    ticket.dueDate = updates.dueDate || ticket.dueDate;
    if (events.length) ticket.events.push(...events);

    await ticket.save();
    logger.info("Ticket updated", { ticketId: ticket._id });
    res.status(200).json({ message: "Ticket updated successfully", ticket });
  } catch (error) {
    logger.error("Ticket update failed", { error: error.message });
    res.status(500).json({ message: "Error updating ticket", error: error.message });
  }
}

// --- DELETE TICKET (admin only) ---
export async function deleteTicket(req, res) {
  try {
    const deleted = await Ticket.findByIdAndDelete(req.params._id);
    if (!deleted) return res.status(404).json({ message: "Ticket not found" });
    logger.info("Ticket deleted", { ticketId: req.params._id });
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    logger.error("Ticket deletion failed", { error: error.message });
    res.status(500).json({ message: "Error deleting ticket", error: error.message });
  }
}