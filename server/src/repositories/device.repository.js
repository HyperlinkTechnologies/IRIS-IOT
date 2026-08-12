import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

import dynamoDB from "../config/dynamodb.js";

const TABLE_NAME = process.env.DYNAMODB_DEVICES_TABLE;

export async function createDevice(device) {
  await dynamoDB.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: device,
    })
  );

  return device;
}

export async function getDeviceById(deviceId) {
  const result = await dynamoDB.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        deviceId,
      },
    })
  );

  return result.Item;
}

export async function getDevices(userId) {
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

export async function updateDevice(deviceId, data) {
  await dynamoDB.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        deviceId,
      },
      UpdateExpression:
        "SET deviceName = :name, #status = :status",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":name": data.deviceName,
        ":status": data.status,
      },
      ReturnValues: "ALL_NEW",
    })
  );
}

export async function deleteDevice(deviceId) {
  await dynamoDB.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        deviceId,
      },
    })
  );
}

export async function getDeviceOwner(deviceId) {

  const device = await getDeviceById(deviceId);

  if (!device) {
    return null;
  }

  return device.userId;

}