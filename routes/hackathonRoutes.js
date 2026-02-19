import express from "express";
import {
  startHackathon,
  stopHackathon,
  getHackathonStatus,
} from "../controllers/hackathonController.js";

const router = express.Router();

// 🌐 Public
router.get("/hackathon/status", getHackathonStatus);

// 🧑‍💼 Admin
router.post("/hackathon/start", startHackathon);
router.post("/hackathon/stop", stopHackathon);

export default router;
