import { SESClient } from "@aws-sdk/client-ses";
import "dotenv/config";

export const ses = new SESClient({
  region: process.env.AWS_REGION,
});