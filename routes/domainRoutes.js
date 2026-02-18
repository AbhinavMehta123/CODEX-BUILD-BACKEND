import express from "express";
import { getDomainsWithTopics } from "../controllers/domainController.js";

const router = express.Router();

// ✅ GET all domains with topics
router.get("/domains-with-topics", getDomainsWithTopics);

export default router;
