import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  addAlert,
  fetchAlerts,
  fetchAlertById,
  editAlert,
  removeAlert,
} from "../controllers/alert.controller.js";

const router = express.Router();

router.post("/", authenticate, addAlert);

router.get("/", authenticate, fetchAlerts);

router.get("/:alertId", authenticate, fetchAlertById);

router.put("/:alertId", authenticate, editAlert);

router.delete("/:alertId", authenticate, removeAlert);

export default router;