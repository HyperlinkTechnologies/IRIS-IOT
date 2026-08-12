import { Router } from "express";
import {
  getPlans,
  getSubscription,
  getBillingHistory,
  cancelSubscription,
} from "../controllers/billing.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/plans", authenticate, getPlans);

router.get("/subscription", authenticate, getSubscription);

router.get("/history", authenticate, getBillingHistory);

router.post("/cancel", authenticate, cancelSubscription);

export default router;