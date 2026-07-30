import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3.js";
import "dotenv/config";

async function testUpload() {
  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: "test/test.json",
        Body: JSON.stringify({
          message: "S3 upload successful",
          time: new Date().toISOString(),
        }),
        ContentType: "application/json",
      })
    );

    console.log("✅ Test upload successful");
  } catch (err) {
    console.error(err);
  }
}

testUpload();