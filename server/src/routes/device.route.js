import express from "express";

import {
  addDevice,
  fetchDevices,
  fetchDeviceById,
  editDevice,
  removeDevice,
} from "../controllers/device.controller.js";

const router = express.Router();

// Create Device
router.post("/", addDevice);

// Get All Devices
router.get("/", fetchDevices);

// Get Device By ID
router.get("/:deviceId", fetchDeviceById);

// Update Device
router.put("/:deviceId", editDevice);

// Delete Device
router.delete("/:deviceId", removeDevice);

export default router;