import { validationResult } from "express-validator";

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: "Validation Failed",
      message: "Invalid inputs",
      details: errors.array(),
    });
  }
  next();
};