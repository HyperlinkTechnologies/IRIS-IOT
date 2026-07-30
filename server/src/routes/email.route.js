import express from "express";
import {
  loginAlert,
  contactForm,
  sendWelcomeEmailController,
} from "../controllers/email.controller.js";

const router = express.Router();

router.post("/login-alert", loginAlert);
router.post("/contact", contactForm);
router.post("/welcome", sendWelcomeEmailController);

export default router;
