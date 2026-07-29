import { Router } from "express";

import {
  createSessionRecord,
  getUserSessions,
  updateSessionActivity,
  deleteSession,
  deleteOtherSessions,
} from "../controllers/session.controller.js";

const router = Router();

router.post("/sessions", createSessionRecord);

router.get("/sessions/:userId", getUserSessions);

router.put(
  "/sessions/:sessionId/activity",
  updateSessionActivity
);

router.delete(
  "/sessions/:sessionId",
  deleteSession
);

router.delete(
  "/sessions/others",
  deleteOtherSessions
);

export default router;