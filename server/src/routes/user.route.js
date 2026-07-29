import express from "express";

import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

// Create Profile
router.post("/", createProfile);

// Get Profile
router.get("/:userId", getProfile);

// Update Profile
router.put("/:userId", updateProfile);

// Delete Profile
router.delete("/:userId", deleteProfile);

export default router;