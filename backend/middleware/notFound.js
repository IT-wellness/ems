export default (req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} does not exist.`,
  });
};