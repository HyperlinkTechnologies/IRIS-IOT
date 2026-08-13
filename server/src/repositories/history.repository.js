import {
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import { s3 } from "../config/s3.js";

const BUCKET = process.env.AWS_S3_BUCKET;

async function streamToString(stream) {
  return await new Promise((resolve, reject) => {
    const chunks = [];

    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () =>
      resolve(Buffer.concat(chunks).toString("utf8"))
    );
  });
}

export async function getHistory(userId, deviceId, planId) {
  const prefix = `${planId}/${userId}/${deviceId}/`;

  console.log("📂 Reading telemetry from S3:");
  console.log("Bucket:", BUCKET);
  console.log("Prefix:", prefix);

  const list = await s3.send(
    new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: prefix,
    })
  );

  if (!list.Contents?.length) {
    console.log("⚠️ No telemetry objects found in S3");
    return [];
  }

  console.log(
    `📦 Found ${list.Contents.length} telemetry files`
  );

  const history = [];

  for (const file of list.Contents) {
    const object = await s3.send(
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: file.Key,
      }),
    );

    const json = await streamToString(object.Body);

    const records = JSON.parse(json);

    if (Array.isArray(records)) {
      history.push(...records);
    }
  }

  history.sort(
    (a, b) =>
      new Date(a.timestamp) - new Date(b.timestamp)
  );

  console.log(
    `📊 Loaded ${history.length} telemetry records`
  );

  return history;
}