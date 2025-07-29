import express from "express";
import { body, param } from "express-validator";
import ticketUpload from "../middleware/ticketUpload.js";
import { authMiddleware, requiresRole } from "../middleware/authMiddleware.js";
import {
  addTicket,
  uploadAttachments,
  listTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

const router = express.Router();

// Validation rules for creating/updating tickets
const ticketValidation = [
  body("title").notEmpty().trim().withMessage("Title is required"),
  body("description").notEmpty().trim().withMessage("Description is required"),
  body("priority").isIn(["low", "medium", "high", "critical"]).withMessage("Invalid priority"),
];

// Auth required for all ticket endpoints
router.use(authMiddleware);

// --- TICKET CREATION --- (Employee, Manager, Admin)
router.post("/add", requiresRole("admin", "manager", "employee"), ticketValidation, addTicket);

// --- ATTACHMENTS UPLOAD ---
router.post(
  "/:_id/attachments",
  requiresRole("admin", "manager", "employee"),
  ticketUpload.array("attachments", 5), // max 5 files
  uploadAttachments
);

// --- TICKET LIST (admin/manager: all, employee: own) ---
router.get(
  "/all",
  requiresRole("admin", "manager", "employee"),
  listTickets
);

// --- SINGLE TICKET GET (admin/manager: any, employee: own) ---
router.get(
  "/:_id",
  requiresRole("admin", "manager", "employee"),
  param("_id").isMongoId(),
  getTicketById
);

// --- TICKET UPDATE ---
router.put(
  "/update/:_id",
  requiresRole("admin", "manager", "employee"),
  ticketValidation,
  updateTicket
);

// --- TICKET DELETE ---
router.delete(
  "/delete/:_id",
  requiresRole("admin"),
  deleteTicket
);

export default router;