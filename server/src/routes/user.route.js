import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", authenticate, createProfile);

router.get("/", authenticate, getProfile);

router.put("/", authenticate, updateProfile);

router.delete("/", authenticate, deleteProfile);

export default router;