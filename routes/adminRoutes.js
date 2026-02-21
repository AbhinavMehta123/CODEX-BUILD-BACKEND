import express from "express";
import jwt from "jsonwebtoken";
import {
  updateAbout,
  addRule,
  addTopic,
  getParticipants,
} from "../controllers/adminController.js";

const router = express.Router();

// ✅ Hardcoded admin credentials
const ADMINS = [
  { username: "admin1", password: "codex@123" },
  { username: "admin2", password: "build@456" },
  { username: "admin3", password: "launch@789" },
  { username: "admin4", password: "secure@321" },
  { username: "admin5", password: "system@654" },
  { username: "admin6", password: "panel@987" },
];

// ✅ JWT Secret (use env in production)
const SECRET = process.env.ADMIN_SECRET || "codex_secret_key_2026";

// ✅ Admin Login Route (no DB, hardcoded check)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const admin = ADMINS.find(
    (u) => u.username === username && u.password === password
  );

  if (!admin) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: "6h" });
  res.json({ success: true, token });
});

// ✅  Admin Management Routes
router.put("/admin/about", updateAbout);
router.post("/admin/rules", addRule);
router.post("/admin/topics", addTopic);
router.get("/admin/participants", getParticipants);

export default router;