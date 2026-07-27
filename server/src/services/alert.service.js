import {
  PutCommand,
  ScanCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

import dynamoDB from "../config/dynamodb.js";
console.log("Alert Table:", process.env.DYNAMODB_ALERT_TABLE);
const TABLE_NAME = process.env.DYNAMODB_ALERT_TABLE;

/* ================= CREATE ================= */

export async function createAlert(alert) {
  await dynamoDB.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: alert,
    })
  );

  return alert;
}

/* ================= GET ALL ================= */

export async function getAlerts() {
  const result = await dynamoDB.send(
    new ScanCommand({
      TableName: TABLE_NAME,
    })
  );

  return result.Items || [];
}

/* ================= GET BY ID ================= */

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

/* ================= UPDATE ================= */

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

/* ================= DELETE ================= */

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