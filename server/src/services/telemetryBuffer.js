import { uploadTelemetryBatch } from "./s3TelemetryService.js";

const buffers = new Map();
const FLUSH_INTERVAL = 5 * 60 * 1000;

export function addTelemetry(telemetry) {
  const deviceId = telemetry.deviceId;

  if (!deviceId) return;

  if (!buffers.has(deviceId)) {
    buffers.set(deviceId, []);
  }

  buffers.get(deviceId).push({
    timestamp: telemetry.timestamp || new Date().toISOString(),
    ...telemetry,
  });
}

setInterval(async () => {
  for (const [deviceId, records] of buffers.entries()) {
    if (!records.length) continue;

    try {
      await uploadTelemetryBatch(deviceId, records);
      buffers.set(deviceId, []);
      console.log(`✅ Uploaded ${records.length} records for ${deviceId}`);
    } catch (err) {
      console.error(err);
    }
  }
}, FLUSH_INTERVAL);