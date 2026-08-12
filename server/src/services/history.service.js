import * as historyRepository from "../repositories/history.repository.js";

export async function getTelemetryHistory(
  deviceId,
  range = "30m"
) {
  const history =
    await historyRepository.getHistory(deviceId);

  const now = Date.now();

const limits = {
  "5m": 5 * 60 * 1000,
  "30m": 30 * 60 * 1000,
  "1h": 60 * 60 * 1000,
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

const duration = limits[range];

if (!duration) {
  return [];
}

const startTime = now - duration;

const filteredHistory = history.filter((item) => {
  const timestamp = new Date(item.timestamp).getTime();

  return timestamp >= startTime && timestamp <= now;
});

if (range !== "7d" && range !== "30d") {
  return filteredHistory;
}

const bucketSize =
  range === "7d"
    ? 60 * 60 * 1000
    : 24 * 60 * 60 * 1000;

const buckets = new Map();

for (const record of filteredHistory) {
  const timestamp = new Date(record.timestamp).getTime();

  const bucketStart =
    Math.floor(timestamp / bucketSize) * bucketSize;

  if (!buckets.has(bucketStart)) {
    buckets.set(bucketStart, []);
  }

  buckets.get(bucketStart).push(record);
}

const aggregated = [];

for (const [bucketStart, records] of buckets) {
  const result = {
    timestamp: new Date(bucketStart).toISOString(),
    deviceId: records[0]?.deviceId,
  };

  const numericKeys = new Set();

  for (const record of records) {
    for (const [key, value] of Object.entries(record)) {
      if (
        key !== "timestamp" &&
        key !== "deviceId" &&
        key !== "rssi" &&
        key !== "uptime" &&
        typeof value === "number" &&
        Number.isFinite(value)
      ) {
        numericKeys.add(key);
      }
    }
  }

  for (const key of numericKeys) {
    const values = records
      .map((record) => record[key])
      .filter(
        (value) =>
          typeof value === "number" &&
          Number.isFinite(value)
      );

    if (values.length) {
      result[key] =
        values.reduce(
          (sum, value) => sum + value,
          0
        ) / values.length;
    }
  }

  aggregated.push(result);
}

aggregated.sort(
  (a, b) =>
    new Date(a.timestamp) -
    new Date(b.timestamp)
);

return aggregated;
}