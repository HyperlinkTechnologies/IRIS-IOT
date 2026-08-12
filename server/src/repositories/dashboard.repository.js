import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

import dynamoDB from "../config/dynamodb.js";

const TABLE_NAME = process.env.DYNAMODB_DASHBOARD_TABLE;

export async function createDashboard(dashboard) {
  await dynamoDB.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: dashboard,
    })
  );

  return dashboard;
}

export async function getDashboards(userId) {
  const result = await dynamoDB.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "userId-index",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    })
  );

  return result.Items || [];
}

export async function getDashboardById(dashboardId) {
  const result = await dynamoDB.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        dashboardId,
      },
    })
  );

  return result.Item;
}

export async function updateDashboard(dashboardId, data) {
  await dynamoDB.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        dashboardId,
      },
      UpdateExpression:
        "SET #name = :name, #device = :device, widgets = :widgets",

      ExpressionAttributeNames: {
        "#name": "name",
        "#device": "device",
      },

      ExpressionAttributeValues: {
        ":name": data.name,
        ":device": data.device,
        ":widgets": data.widgets || [],
      },

      ReturnValues: "ALL_NEW",
    })
  );
}

export async function deleteDashboard(dashboardId) {
  await dynamoDB.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        dashboardId,
      },
    })
  );
}