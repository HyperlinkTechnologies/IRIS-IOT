import express from "express";
import { history } from "../controllers/history.controller.js";

const router = express.Router();

router.get("/telemetry/history", history);

export default router;