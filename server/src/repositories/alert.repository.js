import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

import dynamoDB from "../config/dynamodb.js";

const TABLE_NAME = process.env.DYNAMODB_ALERT_TABLE;

export async function createAlert(alert) {
  await dynamoDB.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: alert,
    })
  );

  return alert;
}

export async function getAlerts(userId) {
  console.log("TABLE:", TABLE_NAME);
  console.log("USER:", userId);

  const command = new QueryCommand({
    TableName: TABLE_NAME,
    IndexName: "userId-index",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  });

  console.log(command.input);

  const result = await dynamoDB.send(command);

  return result.Items || [];
}

export async function getAlertById(alertId) {
  const result = await dynamoDB.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        alertId,
      },
    })
  );

  return result.Item;
}

export async function updateAlert(alertId, updates) {
  const { alertId: _, ...fieldsToUpdate } = updates;

  const keys = Object.keys(fieldsToUpdate);

  const UpdateExpression =
    "SET " +
    keys.map((key, index) => `#k${index} = :v${index}`).join(", ");

  const ExpressionAttributeNames = {};
  const ExpressionAttributeValues = {};

  keys.forEach((key, index) => {
    ExpressionAttributeNames[`#k${index}`] = key;
    ExpressionAttributeValues[`:v${index}`] = fieldsToUpdate[key];
  });

  const result = await dynamoDB.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { alertId },
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ReturnValues: "ALL_NEW",
    })
  );

  return result.Attributes;
}

export async function deleteAlert(alertId) {
  await dynamoDB.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        alertId,
      },
    })
  );

  return {
    success: true,
  };
}