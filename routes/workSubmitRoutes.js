import express from "express";
import {
  submitWork,
  getAllSubmissions,
  getSubmissionByName,
} from "../controllers/workSubmitController.js";

const router = express.Router();

// 🧩 Participant submission
router.post("/submit", submitWork);

// 🧾 Admin endpoints
// routes/workRoutes.js
router.post("/submit", submitWork);
router.get("/all", getAllSubmissions);
router.get("/:name", getSubmissionByName);

export default router;