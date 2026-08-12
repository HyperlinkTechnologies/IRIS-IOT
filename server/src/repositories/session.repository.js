import {
  PutCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

import { randomUUID } from "crypto";

import { dynamoDB } from "../config/aws.js";

const TABLE_NAME = "IRIS-Sessions";

export async function createSession(data) {
  const session = {
    sessionId: randomUUID(),
    userId: data.userId,
    device: data.device,
browser: data.browser,
browserVersion: data.browserVersion,
os: data.os,
    ipAddress: data.ipAddress,
    loginTime: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
  };

  await dynamoDB.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: session,
    })
  );

  return session;
}

export async function getUserSessions(userId) {
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

  return result.Items ?? [];
}

export async function updateSessionActivity(sessionId) {
  await dynamoDB.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { sessionId },
      UpdateExpression:
        "SET lastActivity = :lastActivity",
      ExpressionAttributeValues: {
        ":lastActivity": new Date().toISOString(),
      },
    })
  );
}

export async function deleteSession(sessionId) {
  await dynamoDB.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { sessionId },
    })
  );
}

export async function deleteAllOtherSessions(
  userId,
  currentSessionId
) {
  const sessions = await getUserSessions(userId);

  const otherSessions = sessions.filter(
    (session) => session.sessionId !== currentSessionId
  );

  await Promise.all(
    otherSessions.map((session) =>
      deleteSession(session.sessionId)
    )
  );
}