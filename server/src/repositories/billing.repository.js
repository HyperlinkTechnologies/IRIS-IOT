import { dynamoDB } from "../config/aws.js";
import {
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = process.env.DYNAMODB_SUBSCRIPTIONS_TABLE;

export async function createSubscription(subscription) {
  const command = new PutItemCommand({
    TableName: TABLE_NAME,
    Item: marshall(subscription),
  });

  await dynamoDB.send(command);

  return subscription;
}

export async function getSubscription(userId) {
  const command = new GetItemCommand({
    TableName: TABLE_NAME,

    Key: {
      userId: {
        S: userId,
      },
    },
  });

  const response = await dynamoDB.send(command);

  if (!response.Item) {
    return null;
  }

  return unmarshall(response.Item);
}

export async function updateSubscription(userId, updates) {
  const command = new UpdateItemCommand({
    TableName: TABLE_NAME,

    Key: {
      userId: {
        S: userId,
      },
    },

    UpdateExpression: `
      SET
      planId = :planId,
      #status = :status,
      price = :price,
      billingCycle = :billingCycle,
      nextRenewal = :nextRenewal,
      updatedAt = :updatedAt
    `,

    ExpressionAttributeNames: {
      "#status": "status",
    },

    ExpressionAttributeValues: {
      ":planId": { S: updates.planId },
      ":status": { S: updates.status },
      ":price": { N: updates.price.toString() },
      ":billingCycle": { S: updates.billingCycle },
      ":nextRenewal": { S: updates.nextRenewal },
      ":updatedAt": { S: new Date().toISOString() },
    },

    ReturnValues: "ALL_NEW",
  });

  await dynamoDB.send(command);
}

export async function updateUsage(userId, updates) {

  const subscription = await getSubscription(userId);

  const usage = {
    devices: 0,
    dashboards: 0,
    messages: 0,
    alerts: 0,
    apiCalls: 0,
    ...(subscription?.usage || {}),
    ...updates,
  };

  const command = new UpdateItemCommand({

    TableName: TABLE_NAME,

    Key: {
      userId: {
        S: userId,
      },
    },

    UpdateExpression:
      "SET #usage = :usage, updatedAt = :updatedAt",

    ExpressionAttributeNames: {
      "#usage": "usage",
    },

    ExpressionAttributeValues: {

      ":usage": {
        M: marshall(usage),
      },

      ":updatedAt": {
        S: new Date().toISOString(),
      },

    },

  });

  await dynamoDB.send(command);

}

export async function renewSubscription(
  userId,
  updates
) {

  const command = new UpdateItemCommand({

    TableName: TABLE_NAME,

    Key: {
      userId: {
        S: userId,
      },
    },

    UpdateExpression: `
      SET
      startedAt = :startedAt,
      nextRenewal = :nextRenewal,
      #usage = :usage,
      updatedAt = :updatedAt
    `,

    ExpressionAttributeNames: {
      "#usage": "usage",
    },

    ExpressionAttributeValues: {

      ":startedAt": {
        S: updates.startedAt,
      },

      ":nextRenewal": {
        S: updates.nextRenewal,
      },

      ":usage": {
        M: marshall(updates.usage),
      },

      ":updatedAt": {
        S: new Date().toISOString(),
      },

    },

  });

  await dynamoDB.send(command);

}

export async function reserveUsage(userId, feature, limit) {

  const command = new UpdateItemCommand({

    TableName: TABLE_NAME,

    Key: {
      userId: {
        S: userId,
      },
    },

    UpdateExpression: `
      SET
      #usage.#feature = if_not_exists(#usage.#feature, :zero) + :inc,
      updatedAt = :updatedAt
    `,

    ConditionExpression: `
      attribute_not_exists(#usage.#feature)
      OR #usage.#feature < :limit
    `,

    ExpressionAttributeNames: {
      "#usage": "usage",
      "#feature": feature,
    },

    ExpressionAttributeValues: {

      ":zero": {
        N: "0",
      },

      ":inc": {
        N: "1",
      },

      ":limit": {
        N: limit.toString(),
      },

      ":updatedAt": {
        S: new Date().toISOString(),
      },

    },

    ReturnValues: "UPDATED_NEW",

  });

  return dynamoDB.send(command);

}