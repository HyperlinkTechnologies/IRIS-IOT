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

export async function getHistory(deviceId) {
  const list = await s3.send(
    new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: `${deviceId}/`,
    })
  );

  if (!list.Contents?.length) {
    return [];
  }

  const results = await Promise.all(
  list.Contents.map(async (file) => {
    const object = await s3.send(
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: file.Key,
      })
    );

    const json = await streamToString(object.Body);

    return JSON.parse(json);
  })
);

const history = [];

for (const records of results) {
  if (Array.isArray(records)) {
    history.push(...records);
  }
}

  history.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  return history;
}