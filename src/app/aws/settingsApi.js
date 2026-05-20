import {
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";

import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

import { awsConfig }
from "./awsConfig";

/* ================= CLIENT ================= */

const client =
  new DynamoDBClient({

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

const db =
  DynamoDBDocumentClient.from(
    client
  );

/* ================= SAVE ================= */

export async function saveSettings(
  settings
) {

  await db.send(

    new PutCommand({

      TableName:
        awsConfig.settingsTable,

      Item: settings,
    })
  );
}

/* ================= GET ================= */

export async function getSettings(
  userId
) {

  const result =
    await db.send(

      new GetCommand({

        TableName:
          awsConfig.settingsTable,

        Key: {
          userId,
        },
      })
    );

  return result.Item;
}