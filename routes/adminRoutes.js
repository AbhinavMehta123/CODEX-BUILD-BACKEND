import express from "express";
import jwt from "jsonwebtoken";
import {
  updateAbout,
  addRule,
  addTopic,
  getParticipants,
} from "../controllers/adminController.js";

const router = express.Router();

// ✅ Single Hardcoded Admin
const ADMIN_USER = { username: "admin 1", password: "codex@Alfa2026tf" };

const SECRET = process.env.ADMIN_SECRET || "codex_secret_key_2026";

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check against the single admin object
  if (username !== ADMIN_USER.username || password !== ADMIN_USER.password) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: "6h" });
  
  // Return success and the token
  res.json({ 
    success: true, 
    message: "Login successful", 
    token,
    redirectTo: "/admin" // Optional: Hint for the frontend
  });
});

// ✅ Admin Management Routes
router.put("/admin/about", updateAbout);
router.post("/admin/rules", addRule);
router.post("/admin/topics", addTopic);
router.get("/admin/participants", getParticipants);

export default router;