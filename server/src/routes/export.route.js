import express from "express";
import { exportCSV } from "../controllers/export.controller.js";

const router = express.Router();

router.get("/telemetry/export", exportCSV);

export default router;