import express from "express";
import { testAWS } from "../controllers/aws.controller.js";

const router = express.Router();

router.get("/test", testAWS);

export default router;