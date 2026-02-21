import express from "express";
import {
  submitWork,
  getAllSubmissions,
  getSubmissionByName,
} from "../controllers/workSubmitController.js";

const router = express.Router();

// 🧩 Participant submission
router.post("/work/submit", submitWork);

// 🧾 Admin endpoints
router.get("/work/all", getAllSubmissions);
router.get("/work/:name", getSubmissionByName);

export default router;