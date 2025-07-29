export default (err, req, res, next) => {
  console.error("\uD83D\uDEA8", err);

  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    error: "Error",
    message,
    details: err.details || undefined,
  });
};