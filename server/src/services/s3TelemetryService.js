import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3.js";
import * as billingRepository from "../repositories/billing.repository.js";

export async function uploadTelemetryBatch(
  userId,
  deviceId,
  records
) {
  if (!records.length) return;

  const subscription =
  await billingRepository.getSubscription(userId);

const planId = subscription.planId;

const retentionDays =
  subscription.retentionDays ??
  subscription.limits?.retentionDays ??
  30;

  const now = new Date();

  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  const hour = String(now.getUTCHours()).padStart(2, "0");
  const minute = Math.floor(now.getUTCMinutes() / 5) * 5;

  const key =
`${planId}/${userId}/${deviceId}/${year}/${month}/${day}/${hour}-${String(minute).padStart(2,"0")}.json`;
  console.log("S3 Key:", key);

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: JSON.stringify(records, null, 2),
      ContentType: "application/json",

Metadata: {
  userid: userId,
  deviceid: deviceId,
  plan: planId,
  retentiondays: String(retentionDays),
},
    })
  );
}