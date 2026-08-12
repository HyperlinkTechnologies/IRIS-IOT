import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  addDevice,
  fetchDevices,
  fetchDeviceById,
  editDevice,
  removeDevice,
} from "../controllers/device.controller.js";

const router = express.Router();

router.post("/", authenticate, addDevice);

router.get("/", authenticate, fetchDevices);

router.get("/:deviceId", authenticate, fetchDeviceById);

router.put("/:deviceId", authenticate, editDevice);

router.delete("/:deviceId", authenticate, removeDevice);

export default router;