import express from "express";
import { getDomainsWithTopics, addDomain, addTopic } from "../controllers/domainController.js";

const router = express.Router();

router.get("/domains-with-topics", getDomainsWithTopics); //  for frontend
router.post("/domains", addDomain); // admin: add new domain
router.post("/topics", addTopic);   // admin: add topic to domain

export default router;
