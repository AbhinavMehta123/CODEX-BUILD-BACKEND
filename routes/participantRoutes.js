import express from "express";
import { startBuild, verifyParticipant } from "../controllers/participantController.js";

const router = express.Router();

// 🎯 Participant starts build (fills name, phone, college, course)
router.post("/startbuild", startBuild);

// 🔐 Verify participant token (for restoring session)
router.post("/participant/verify", verifyParticipant);

export default router;