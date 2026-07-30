import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3.js";

export async function uploadTelemetryBatch(deviceId, records) {
  if (!records.length) return;

  const now = new Date();

  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  const hour = String(now.getUTCHours()).padStart(2, "0");
  const minute = Math.floor(now.getUTCMinutes() / 5) * 5;

  const key = `${deviceId}/${year}/${month}/${day}/${hour}-${String(minute).padStart(2, "0")}.json`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: JSON.stringify(records, null, 2),
      ContentType: "application/json",
    })
  );
}