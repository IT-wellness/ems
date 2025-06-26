import express from "express";
import ticketModel from "../models/Ticket.js";

const router = express.Router();

router.post("/add", async (req, res) => {
    const { title, description, status, priority, assignedTo } = req.body;

    try {
        const newTicket = new ticketModel({
            title,
            description,
            status,
            priority,
            assignedTo
        });

        await newTicket.save();
        res.status(201).json({ message: "Ticket created successfully", ticket: newTicket });
    } catch (error) {
        res.status(400).json({ message: "Error creating ticket", error: error.message });
    }
});

router.get("/all", async (req, res) => {
    try {
        const tickets = await ticketModel.find({}).populate("assignedTo");
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tickets", error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await ticketModel.findById(id).populate("assignedTo");
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: "Error fetching ticket", error: error.message });
    }
});

router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, assignedTo } = req.body;

    try {
        const updatedTicket = await ticketModel.findByIdAndUpdate(id, {
            title,
            description,
            status,
            priority,
            assignedTo
        }, { new: true });

        if (!updatedTicket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket updated successfully", ticket: updatedTicket });
    } catch (error) {
        res.status(400).json({ message: "Error updating ticket", error: error.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTicket = await ticketModel.findByIdAndDelete(id);
        if (!deletedTicket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting ticket", error: error.message });
    }
});

export default router;