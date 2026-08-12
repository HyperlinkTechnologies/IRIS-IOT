import * as sessionService from "../services/session.service.js";
import { createSession } from "../services/session.service.js";

export async function getUserSessions(req, res) {
  try {
    const sessions =
  await sessionService.getUserSessions(req.user.sub);

    res.json({
      success: true,
      sessions,
    });
  } catch (error) {
    console.error("Get Sessions Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sessions",
    });
  }
}

export async function updateSessionActivity(req, res) {
  try {
    const { sessionId } = req.params;

    await sessionService.updateSessionActivity(sessionId);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error("Update Session Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update session",
    });
  }
}

export async function deleteSession(req, res) {
  try {
    const { sessionId } = req.params;

    await sessionService.deleteSession(sessionId);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error("Delete Session Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete session",
    });
  }
}

export async function createSessionRecord(req, res) {
  try {
    const session =
  await createSession({
    ...req.body,
    userId: req.user.sub,
  });

    res.status(201).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error("Create Session Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create session",
    });
  }
}

export async function deleteOtherSessions(req, res) {
  try {
    const { currentSessionId } = req.body;

await sessionService.deleteAllOtherSessions(
  req.user.sub,
  currentSessionId
);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete sessions",
    });
  }
}