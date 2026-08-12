import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  addDashboard,
  fetchDashboards,
  fetchDashboardById,
  editDashboard,
  removeDashboard,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.post("/", authenticate, addDashboard);

router.get("/", authenticate, fetchDashboards);

router.get("/:dashboardId", authenticate, fetchDashboardById);

router.put("/:dashboardId", authenticate, editDashboard);

router.delete("/:dashboardId", authenticate, removeDashboard);

export default router;