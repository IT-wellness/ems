import { body } from "express-validator";

export const validateTicketCreation = [
  body("title")
    .notEmpty()
    .withMessage("Ticket title is required"),
  body("description")
    .notEmpty()
    .withMessage("Ticket description is required"),
];