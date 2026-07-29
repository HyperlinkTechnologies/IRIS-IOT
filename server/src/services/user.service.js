import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

import dynamoDB from "../config/dynamodb.js";

// Create User
export async function createUser(user) {
  const TABLE_NAME = process.env.DYNAMODB_USER_TABLE;

  await dynamoDB.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: user,
    })
  );

  return user;
}

// Get User
export async function getUserById(userId) {
  const result = await dynamoDB.send(
    new GetCommand({
      TableName: process.env.DYNAMODB_USER_TABLE,
      Key: {
        userId,
      },
    })
  );

  return result.Item;
}

// Update User
// Update User
export async function updateUser(userId, data) {
  const updates = [];
  const values = {};

  if (data.username !== undefined) {
    updates.push("username = :username");
    values[":username"] = data.username;
  }

  if (data.image !== undefined) {
    updates.push("image = :image");
values[":image"] = data.image;
  }

  if (data.fullName !== undefined) {
    updates.push("fullName = :fullName");
    values[":fullName"] = data.fullName;
  }

  if (data.jobTitle !== undefined) {
    updates.push("jobTitle = :jobTitle");
    values[":jobTitle"] = data.jobTitle;
  }

  if (data.phone !== undefined) {
    updates.push("phone = :phone");
    values[":phone"] = data.phone;
  }

  if (data.bio !== undefined) {
    updates.push("bio = :bio");
    values[":bio"] = data.bio;
  }

  if (data.companyName !== undefined) {
  updates.push("companyName = :companyName");
  values[":companyName"] = data.companyName;
}

if (data.companyWebsite !== undefined) {
  updates.push("companyWebsite = :companyWebsite");
  values[":companyWebsite"] = data.companyWebsite;
}

if (data.companyEmail !== undefined) {
  updates.push("companyEmail = :companyEmail");
  values[":companyEmail"] = data.companyEmail;
}

if (data.companyPhone !== undefined) {
  updates.push("companyPhone = :companyPhone");
  values[":companyPhone"] = data.companyPhone;
}

if (data.companyAddress !== undefined) {
  updates.push("companyAddress = :companyAddress");
  values[":companyAddress"] = data.companyAddress;
}

if (data.companyDescription !== undefined) {
  updates.push("companyDescription = :companyDescription");
  values[":companyDescription"] = data.companyDescription;
}

if (data.twoFactorEnabled !== undefined) {
  updates.push("twoFactorEnabled = :twoFactorEnabled");
  values[":twoFactorEnabled"] = data.twoFactorEnabled;
}

if (data.loginAlerts !== undefined) {
    updates.push("loginAlerts = :loginAlerts");
    values[":loginAlerts"] = data.loginAlerts;
}

if (data.sessionTimeout !== undefined) {
    updates.push("sessionTimeout = :sessionTimeout");
    values[":sessionTimeout"] = Number(data.sessionTimeout);
}

  if (updates.length === 0) {
    throw new Error("No fields provided to update.");
  }

  const result = await dynamoDB.send(
    new UpdateCommand({
      TableName: process.env.DYNAMODB_USER_TABLE,
      Key: {
        userId,
      },
      UpdateExpression: `SET ${updates.join(", ")}`,
      ExpressionAttributeValues: values,
      ReturnValues: "ALL_NEW",
    })
  );

  return result.Attributes;
}

// Delete User
export async function deleteUser(userId) {
  await dynamoDB.send(
    new DeleteCommand({
      TableName: process.env.DYNAMODB_USER_TABLE,

      Key: {
        userId,
      },
    })
  );
}