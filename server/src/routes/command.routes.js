import express from "express";
import { sendCommand } from "../controllers/command.controller.js";

const router = express.Router();

/*
POST /api/devices/:deviceId/commands

Body:
{
  "command": "...",
  "payload": { ... }
}
*/

router.post("/devices/:deviceId/commands", sendCommand);

export default router;