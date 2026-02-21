import express from "express";
import {
  startHackathon,
  stopHackathon,
  getHackathonStatus,
  stopResponses, 
} from "../controllers/hackathonController.js";

const router = express.Router();

// 🌐 Public
router.get("/hackathon/status", getHackathonStatus);

// 🧑‍💼 Admin
router.post("/hackathon/start", startHackathon);
router.post("/hackathon/stop", stopHackathon);

// 🛑 New route: Stop participant responses
router.post("/hackathon/stop-responses", stopResponses);

export default router;