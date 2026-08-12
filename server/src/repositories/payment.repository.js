import { PutCommand, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";
import dynamoDB from "../config/dynamodb.js";

const TABLE_NAME = process.env.DYNAMODB_PAYMENT_TABLE;

export async function getPaymentByIrisOrderId(irisOrderId) {
  const response = await dynamoDB.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "irisOrderId-index",
      KeyConditionExpression: "irisOrderId = :irisOrderId",
      ExpressionAttributeValues: {
        ":irisOrderId": irisOrderId,
      },
    })
  );

  return response.Items?.[0] || null;
}

export async function createPayment(payment) {
  const item = {
    ...payment,
    createdAt: payment.createdAt || new Date().toISOString(),
  };

  await dynamoDB.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
    })
  );

  return item;
}

export async function getPaymentByOrderId(orderId) {
  const response = await dynamoDB.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        paymentId: orderId,
      },
    })
  );

  return response.Item || null;
}

export async function getPaymentsByUserId(userId) {
  const response = await dynamoDB.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "userId-index",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    })
  );

  return response.Items || [];
}