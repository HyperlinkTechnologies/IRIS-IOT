export const healthCheck = (req, res) => {
  res.json({
    success: true,
    message: "IRIS Backend Running",
  });
};