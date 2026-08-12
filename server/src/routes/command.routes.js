import express from "express";
import { sendCommand } from "../controllers/command.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post(
  "/devices/:deviceId/commands",
  authenticate,
  sendCommand
);

export default router;