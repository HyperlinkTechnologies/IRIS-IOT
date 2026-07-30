import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3.js";

const BUCKET = process.env.AWS_S3_BUCKET;

async function streamToString(stream) {
  return await new Promise((resolve, reject) => {
    const chunks = [];

    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

export async function getTelemetryHistory(deviceId, range = "30m") {
  const prefix = `${deviceId}/`;

  const list = await s3.send(
    new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: prefix,
    })
  );

  if (!list.Contents?.length) {
    return [];
  }

  const history = [];

  for (const file of list.Contents) {
    const object = await s3.send(
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: file.Key,
      })
    );

    const json = await streamToString(object.Body);

    const records = JSON.parse(json);

if (Array.isArray(records)) {
  history.push(...records);
}
  }

  history.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  const now = Date.now();

const limits = {
    "5m": 5 * 60 * 1000,
    "30m": 30 * 60 * 1000,
    "1h": 60 * 60 * 1000,
    "24h": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000,
};

const duration = limits[range] || limits["30m"];

return history.filter(item =>
    now - new Date(item.timestamp).getTime() <= duration
);

  return history;
}