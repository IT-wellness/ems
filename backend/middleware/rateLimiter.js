import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: "Too many login attempts. Try again later.",
});
