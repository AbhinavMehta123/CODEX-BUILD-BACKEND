import express from "express";
import {
  updateAbout,
  addRule,
  addTopic,
  getParticipants,
} from "../controllers/adminController.js";

const router = express.Router();

router.put("/admin/about", updateAbout);
router.post("/admin/rules", addRule);
router.post("/admin/topics", addTopic);
router.get("/admin/participants", getParticipants);

export default router;
