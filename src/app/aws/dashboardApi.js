import {
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";

import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  DeleteCommand,
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

/* ================= SAVE DASHBOARD ================= */

export async function saveDashboard(
  dashboard
) {

  try {

    await db.send(

      new PutCommand({

        TableName:
          awsConfig.dashboardTable,

        Item: dashboard,
      })
    );

  } catch (error) {

    console.log(error);
  }
}

/* ================= GET DASHBOARDS ================= */

export async function getDashboards(
  userId
) {

  try {

    const result =
      await db.send(

        new QueryCommand({

          TableName:
            awsConfig.dashboardTable,

          KeyConditionExpression:
            "userId = :u",

          ExpressionAttributeValues: {

            ":u": userId,
          },
        })
      );

    return result.Items || [];

  } catch (error) {

    console.log(error);

    return [];
  }
}

/* ================= DELETE ================= */

export async function deleteDashboard(
  userId,
  dashboardId
) {

  try {

    await db.send(

      new DeleteCommand({

        TableName:
          awsConfig.dashboardTable,

        Key: {

          userId,

          dashboardId,
        },
      })
    );

  } catch (error) {

    console.log(error);
  }
}