import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createSessionRecord,
  getUserSessions,
  updateSessionActivity,
  deleteSession,
  deleteOtherSessions,
} from "../controllers/session.controller.js";

const router = Router();

router.post("/sessions", authenticate, createSessionRecord);

router.get("/sessions", authenticate, getUserSessions);

router.put(
  "/sessions/:sessionId/activity",
  authenticate,
  updateSessionActivity
);

router.delete(
  "/sessions/:sessionId",
  authenticate,
  deleteSession
);

router.delete(
  "/sessions/others",
  authenticate,
  deleteOtherSessions
);

export default router;