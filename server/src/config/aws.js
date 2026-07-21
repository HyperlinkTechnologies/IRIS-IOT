import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";
import { SNSClient } from "@aws-sdk/client-sns";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

const REGION = process.env.AWS_REGION;

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

export const dynamoDB = new DynamoDBClient({
  region: REGION,
  credentials,
});

export const s3 = new S3Client({
  region: REGION,
  credentials,
});

export const sns = new SNSClient({
  region: REGION,
  credentials,
});

export const cognito = new CognitoIdentityProviderClient({
  region: REGION,
  credentials,
});