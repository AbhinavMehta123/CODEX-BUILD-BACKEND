import express from "express";
import {
  startHackathon,
  stopHackathon,
  getHackathonStatus,
  stopResponses,
  allowResponses, // ✅ Import the new controller function
} from "../controllers/hackathonController.js";

const router = express.Router();

// 🌐 Public / Participant View
router.get("/hackathon/status", getHackathonStatus);

// 🧑‍💼 Admin - Event Controls
router.post("/hackathon/start", startHackathon);
router.post("/hackathon/stop", stopHackathon);

// 🛑 Admin - Response Controls
router.post("/hackathon/stop-responses", stopResponses);
router.post("/hackathon/allow-responses", allowResponses); // ✅ New route: Re-open work submission

export default router;