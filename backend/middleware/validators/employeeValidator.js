import { body } from "express-validator";

export const validateEmployeeCreation = [
  body("personal.firstName")
    .notEmpty()
    .withMessage("First name is required"),
  body("contact.email")
    .isEmail()
    .withMessage("Valid contact email is required"),
  body("employment.employeeId")
    .notEmpty()
    .withMessage("Employee ID is required"),
];