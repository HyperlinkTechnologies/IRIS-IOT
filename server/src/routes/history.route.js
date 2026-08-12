import express from "express";
import { history } from "../controllers/history.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/telemetry/history", authenticate, history);

export default router;
