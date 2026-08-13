import { getTelemetryHistory } from "../services/history.service.js";

export async function history(req, res) {
  try {
    const { deviceId, range } = req.query;
    const userId = req.user.sub;

    if (!deviceId) {
      return res.status(400).json({
        error: "deviceId is required",
      });
    }

    const data = await getTelemetryHistory(
      userId,
      deviceId,
      range
    );

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch telemetry history",
    });
  }
}