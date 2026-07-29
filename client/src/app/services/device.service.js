import request from "./api";
import { getCurrentUser } from "aws-amplify/auth";

// Get All Devices
export async function getDevices() {
  const currentUser = await getCurrentUser();

  const response = await request(
    `/devices?userId=${currentUser.userId}`
  );

  return response.data.map((device) => ({
    id: device.deviceId,
    deviceId: device.deviceId,
    name: device.deviceName,
    firmware: device.firmwareVersion,
    apiKey: device.apiKey || "",
    location: device.location || "",
    description: device.description || "",
    gatewayId: device.gatewayId,
    status: device.status,
    createdAt: device.createdAt,
    updatedAt: device.updatedAt,
  }));
}

// Create Device
export async function createDevice(device) {
  const currentUser = await getCurrentUser();

  const response = await request("/devices", {
    method: "POST",
    body: JSON.stringify({
      ...device,
      userId: currentUser.userId,
    }),
  });

  return response.data;
}

// Update Device
export async function updateDevice(deviceId, device) {
  await request(`/devices/${deviceId}`, {
    method: "PUT",
    body: JSON.stringify(device),
  });
}

// Delete Device
export async function deleteDevice(deviceId) {
  await request(`/devices/${deviceId}`, {
    method: "DELETE",
  });
}

// Get Single Device
export async function getDevice(deviceId) {
  const response = await request(`/devices/${deviceId}`);

  return response.data;
}