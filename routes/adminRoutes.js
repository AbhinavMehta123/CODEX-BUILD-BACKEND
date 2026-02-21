import express from "express";
import jwt from "jsonwebtoken";
import {
  updateAbout,
  addRule,
  addTopic,
  getParticipants,
} from "../controllers/adminController.js";

const router = express.Router();

// ✅ Single Hardcoded Admin (Removed the space for reliability)
const ADMIN_USER = { 
  username: "admin1", 
  password: "codex@Alfa2026tf" 
};

const SECRET = process.env.ADMIN_SECRET || "codex_secret_key_2026";

router.post("/login", (req, res) => {
  // Use trim() to handle accidental spaces from the input field
  const username = req.body.username?.trim();
  const password = req.body.password?.trim();

  if (username !== ADMIN_USER.username || password !== ADMIN_USER.password) {
    console.log(`Failed login attempt for: ${username}`); // Helpful for Render logs
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: "6h" });
  
  res.json({ 
    success: true, 
    message: "Login successful", 
    token,
    redirectTo: "/admin" 
  });
});

// ✅ Admin Management Routes
router.put("/admin/about", updateAbout);
router.post("/admin/rules", addRule);
router.post("/admin/topics", addTopic);
router.get("/admin/participants", getParticipants);

export default router;