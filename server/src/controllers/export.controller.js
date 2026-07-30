import { getTelemetryHistory } from "../services/history.service.js";

export async function exportCSV(req, res) {
  try {
    const { deviceId, range = "30m" } = req.query;

    const history = await getTelemetryHistory(deviceId, range);

    if (!history.length) {
      return res.status(404).json({
        error: "No telemetry available",
      });
    }

    const headers = Object.keys(history[0]);

    const csv = [
      headers.join(","),
      ...history.map(row =>
        headers.map(key => row[key]).join(",")
      ),
    ].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${deviceId}-${range}.csv`
    );

    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "CSV export failed" });
  }
}