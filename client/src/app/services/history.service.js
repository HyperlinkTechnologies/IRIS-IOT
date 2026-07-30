const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function getTelemetryHistory(deviceId, range) {
    console.log(deviceId);
  const response = await fetch(
    `${API}/telemetry/history?deviceId=${deviceId}&range=${range}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch telemetry history");
  }

  return response.json();
}

export function exportTelemetry(deviceId, range) {
  window.open(
    `${API}/telemetry/export?deviceId=${deviceId}&range=${range}`,
    "_blank"
  );
}