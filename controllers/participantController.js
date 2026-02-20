import jwt from "jsonwebtoken";
import Participant from "../models/Participant.js";

const JWT_SECRET =
  process.env.JWT_SECRET || "+t0N9wuQod3xw7YdHPbCJW5JzunVASltsSENOz9Ym6M=";

// 🧠 Utility: Random topic generator
const topics = [
  "AI-Powered Chatbot",
  "Blockchain Voting System",
  "IoT Smart Home Dashboard",
  "ML Model Deployment",
  "Crypto Portfolio Tracker",
  "Voice Recognition Attendance App",
  "AI Resume Analyzer",
  "Smart Health Monitoring System",
  "Data Visualization Dashboard",
  "AR-based Learning Platform",
];

// 🎯 Start Build Controller
export const startBuild = async (req, res) => {
  const { name, phone, college, course } = req.body;

  if (!name || !phone || !college || !course) {
    return res.status(400).json({
      message: "Name, phone, college, and course are required",
    });
  }

  try {
    // 🧩 Check if participant already exists
    let existing = await Participant.findOne({ name, phone });
    if (existing) {
      return res.json({
        name: existing.name,
        phone: existing.phone,
        college: existing.college,
        course: existing.course,
        topic: existing.topic,
        startTime: existing.startTime,
        token: existing.token,
      });
    }

    // 🧠 Generate a random topic
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];

    // 🔑 Generate a JWT token
    const token = jwt.sign({ name, phone, college, course }, JWT_SECRET, {
      expiresIn: "6h",
    });

    // 💾 Save new participant
    const participant = await Participant.create({
      name,
      phone,
      college,
      course,
      topic: randomTopic,
      token,
    });

    res.json({
      name: participant.name,
      phone: participant.phone,
      college: participant.college,
      course: participant.course,
      topic: participant.topic,
      startTime: participant.startTime,
      token: participant.token,
    });
  } catch (err) {
    console.error("Error in startBuild:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Verify Participant Controller
export const verifyParticipant = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const participant = await Participant.findOne({
      name: decoded.name,
      phone: decoded.phone,
    });

    if (!participant)
      return res.status(404).json({ message: "Participant not found" });

    // 🧮 Calculate elapsed time (for reference)
    const now = new Date();
    const elapsedMinutes = Math.floor(
      (now - participant.startTime) / 60000
    );

    res.json({
      name: participant.name,
      phone: participant.phone,
      college: participant.college,
      course: participant.course,
      topic: participant.topic,
      startTime: participant.startTime,
      elapsedMinutes,
    });
  } catch (err) {
    console.error("Error verifying participant:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};