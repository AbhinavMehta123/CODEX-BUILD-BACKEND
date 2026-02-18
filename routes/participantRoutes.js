import express from "express";
import { startBuild, verifyParticipant } from "../controllers/participantController.js";

const router = express.Router();

// POST /api/participant/StartBuild
router.post("/StartBuild", startBuild);

// POST /api/participant/verify
router.post("/verify", verifyParticipant);

export default router;
