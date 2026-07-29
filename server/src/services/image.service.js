import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { s3 } from "../config/s3.js";
import { randomUUID } from "crypto";

const BUCKET = "iris-profile-images";

export async function deleteProfileImage(imageUrl) {
  if (!imageUrl) return;

  try {
    const url = new URL(imageUrl);

    const key = decodeURIComponent(
      url.pathname.substring(1)
    );

    await s3.send(
      new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
      })
    );
  } catch (error) {
    console.error("Delete Image Error:", error);
  }
}

export async function uploadProfileImage(file, userId, oldImage) {
  const extension = file.originalname.split(".").pop();

  const key = `users/${userId}/${randomUUID()}.${extension}`;

  await deleteProfileImage(oldImage);
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return {
    image: `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
  };
}