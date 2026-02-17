import express from "express";
import { startBuild } from "../controllers/participantController.js";

const router = express.Router();

router.post("/start-build", startBuild);

export default router;
