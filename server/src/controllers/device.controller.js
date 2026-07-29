import {
  createDevice,
  getDevices,
  getDeviceById,
  updateDevice,
  deleteDevice,
} from "../services/device.service.js";

export async function addDevice(req, res) {
  try {
    const device = req.body;

    await createDevice(device);

    res.status(201).json({
      success: true,
      message: "Device created successfully.",
      data: device,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function fetchDevices(req, res) {
  try {
    const { userId } = req.query;

    if (!userId) {
  return res.status(400).json({
    success: false,
    message: "userId is required.",
  });
}

const devices = await getDevices(userId);

    res.json({
      success: true,
      data: devices,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function fetchDeviceById(req, res) {
  try {
    const { deviceId } = req.params;

    const device = await getDeviceById(deviceId);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found.",
      });
    }

    res.json({
      success: true,
      data: device,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function editDevice(req, res) {
  try {
    const { deviceId } = req.params;

    await updateDevice(deviceId, req.body);

    res.json({
      success: true,
      message: "Device updated successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function removeDevice(req, res) {
  try {
    const { deviceId } = req.params;

    await deleteDevice(deviceId);

    res.json({
      success: true,
      message: "Device deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}