import express from "express";
import { exportCSV } from "../controllers/export.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get(
  "/telemetry/export",
  authenticate,
  exportCSV
);

export default router;