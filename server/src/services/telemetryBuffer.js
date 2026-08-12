import { uploadTelemetryBatch } from "./s3TelemetryService.js";

const buffers = new Map();
const FLUSH_INTERVAL = 5 * 60 * 1000;

export function addTelemetry(telemetry) {
  const deviceId = telemetry.deviceId;
  const userId = telemetry.userId;

  if (!deviceId) return;

  if (!buffers.has(deviceId)) {
    buffers.set(deviceId, {
  userId,
  records: [],
});
  }

  buffers.get(deviceId).records.push({
    timestamp: telemetry.timestamp || new Date().toISOString(),
    ...telemetry,
  });
}

setInterval(async () => {
  for (const [deviceId, buffer] of buffers.entries()) {

  const { userId, records } = buffer;
    if (!records.length) continue;

    try {
      console.log("Uploading:", {
  userId,
  deviceId,
  count: records.length,
});
      await uploadTelemetryBatch(
  userId,
  deviceId,
  records
);
      buffer.records = [];
      console.log(`✅ Uploaded ${records.length} records for ${deviceId}`);
    } catch (err) {
      console.error(err);
    }
  }
}, FLUSH_INTERVAL);