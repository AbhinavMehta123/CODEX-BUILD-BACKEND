import express from "express";
import { submitWork, getAllSubmissions, getSubmissionByName } from "../controllers/workSubmitController.js";

const router = express.Router();

// Participant submits work
router.post("/submit", submitWork);

// Admin endpoints
router.get("/all", getAllSubmissions);
router.get("/:name", getSubmissionByName);

export default router;