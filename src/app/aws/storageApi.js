import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { awsConfig }
from "./awsConfig";

/* ================= CLIENT ================= */

const s3 =
  new S3Client({

    region:
      awsConfig.region,

    credentials: {

      accessKeyId:
        import.meta.env
          .VITE_AWS_ACCESS_KEY,

      secretAccessKey:
        import.meta.env
          .VITE_AWS_SECRET_KEY,
    },
  });

/* ================= UPLOAD ================= */

export async function uploadProfileImage(
  file
) {

  const key =
    `profiles/${Date.now()}-${file.name}`;

  await s3.send(

    new PutObjectCommand({

      Bucket:
        awsConfig.bucketName,

      Key: key,

      Body: file,

      ContentType:
        file.type,
    })
  );

  return `https://${awsConfig.bucketName}.s3.amazonaws.com/${key}`;
}