import {
  PutCommand,
  ScanCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

import dynamoDB from "../config/dynamodb.js";




// Create Device
export async function createDevice(device) {
    console.log("TABLE NAME:", process.env.DYNAMODB_DEVICES_TABLE);
    
const TABLE_NAME = process.env.DYNAMODB_DEVICES_TABLE;

  await dynamoDB.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: device,
    })
  );

  return device;
}

// Get Device
export async function getDeviceById(deviceId) {
  const result = await dynamoDB.send(
    new GetCommand({
      TableName: process.env.DYNAMODB_DEVICES_TABLE,
      Key: {
        deviceId,
      },
    })
  );

  return result.Item;
}

//Update device
export async function updateDevice(deviceId, data) {
  await dynamoDB.send(
    new UpdateCommand({
      TableName: process.env.DYNAMODB_DEVICES_TABLE,

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

//Delete device
export async function deleteDevice(deviceId) {
  await dynamoDB.send(
    new DeleteCommand({
      TableName: process.env.DYNAMODB_DEVICES_TABLE,

      Key: {
        deviceId,
      },
    })
  );
}

// Get All Devices
export async function getDevices(userId) {
  const result = await dynamoDB.send(
    new QueryCommand({
      TableName: process.env.DYNAMODB_DEVICES_TABLE,
      IndexName: "userId-index",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    })
  );

  return result.Items || [];
}