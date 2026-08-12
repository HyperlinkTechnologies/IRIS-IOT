import * as deviceRepository from "../repositories/device.repository.js";
import * as limitService from "./subscriptionLimit.service.js";
import * as billingRepository from "../repositories/billing.repository.js";

// Create Device
export async function createDevice(device) {

  let validation;

try {

  validation =
    await limitService.reserveDeviceSlot(device.userId);

} catch (err) {

  if (err.name === "ConditionalCheckFailedException") {

    const error = new Error("Device limit reached.");

    error.statusCode = 403;

    error.code = "DEVICE_LIMIT_REACHED";

    error.details = {
      feature: "Devices",
      currentPlan: err.plan,
      currentLimit: err.limit,
    };

    throw error;
  }

  throw err;
}

  const createdDevice =
  await deviceRepository.createDevice(device);

const devices =
  await deviceRepository.getDevices(device.userId);

await billingRepository.updateUsage(device.userId, {
  devices: devices.length,
});

return createdDevice;
}

// Get All Devices
export async function getDevices(userId) {
  return deviceRepository.getDevices(userId);
}

// Get Device By ID
export async function getDeviceById(deviceId) {
  return deviceRepository.getDeviceById(deviceId);
}

// Update Device
export async function updateDevice(deviceId, data) {
  return deviceRepository.updateDevice(deviceId, data);
}

// Delete Device
export async function deleteDevice(deviceId) {
  const device =
  await deviceRepository.getDeviceById(deviceId);

await deviceRepository.deleteDevice(deviceId);

const devices =
  await deviceRepository.getDevices(device.userId);

await billingRepository.updateUsage(device.userId, {
  devices: devices.length,
});

return;
}