import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/aws.js";

export async function testAWS(req, res) {
  try {
    const result = await s3.send(new ListBucketsCommand({}));

    res.json({
      success: true,
      message: "AWS connection successful.",
      buckets: result.Buckets,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "AWS connection failed.",
      error: error.message,
    });
  }
}