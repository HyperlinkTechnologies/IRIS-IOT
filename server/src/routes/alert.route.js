import express from "express";

import {
  addAlert,
  fetchAlerts,
  fetchAlertById,
  editAlert,
  removeAlert,
} from "../controllers/alert.controller.js";

const router = express.Router();

router.post("/", addAlert);

router.get("/", fetchAlerts);

router.get("/:alertId", fetchAlertById);

router.put("/:alertId", editAlert);

router.delete("/:alertId", removeAlert);

export default router;