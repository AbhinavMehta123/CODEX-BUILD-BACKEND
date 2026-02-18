import express from "express";
import { seedDatabase } from "../controllers/seedController.js";

const router = express.Router();

// 🔐 Only enable in dev mode (optional)
router.get("/seed", seedDatabase);

export default router;
