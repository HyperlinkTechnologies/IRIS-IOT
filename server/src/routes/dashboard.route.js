import express from "express";

import {
  addDashboard,
  fetchDashboards,
  fetchDashboardById,
  editDashboard,
  removeDashboard,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.post("/", addDashboard);

router.get("/", fetchDashboards);

router.get("/:dashboardId", fetchDashboardById);

router.put("/:dashboardId", editDashboard);

router.delete("/:dashboardId", removeDashboard);

export default router;