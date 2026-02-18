import express from "express";
import {
  startHackathon,
  stopHackathon,
  getHackathonStatus,
} from "../controllers/hackathonController.js";

const router = express.Router();

// Admin endpoints
router.post("/hackathon/start", startHackathon);
router.post("/hackathon/stop", stopHackathon);

// Public endpoint (for participants)
router.get("/hackathon/status", getHackathonStatus);

export default router;
