import express from "express";
import { getAbout, getRules } from "../controllers/publicController.js";

const router = express.Router();

router.get("/about", getAbout);
router.get("/rules", getRules);

export default router;
