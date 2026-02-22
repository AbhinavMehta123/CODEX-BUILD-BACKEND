import jwt from "jsonwebtoken";
import Participant from "../models/Participant.js";
import Hackathon from "../models/Hackathon.js"; // ✅ make sure this path is correct

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

// ✅ Verify Participant Controller (fixed and error-free)
export const verifyParticipant = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    // 🔑 Decode token and verify participant
    const decoded = jwt.verify(token, JWT_SECRET);
    const participant = await Participant.findOne({
      name: decoded.name,
      phone: decoded.phone,
    });

    if (!participant)
      return res.status(404).json({ message: "Participant not found" });

    // ✅ Safely fetch global hackathon status
    let hackathon = await Hackathon.findOne();
    if (!hackathon) {
      hackathon = { isActive: false, startTime: null }; // fallback if no record exists
    }

    const isActive = Boolean(hackathon.isActive);
    const startTime = hackathon.startTime ? hackathon.startTime : null;

    // 🧮 Optional: calculate elapsed time
    let elapsedMinutes = 0;
    if (participant.startTime) {
      const now = new Date();
      elapsedMinutes = Math.floor((now - participant.startTime) / 60000);
    }

    // ✅ Return combined data (participant + hackathon)
    res.status(200).json({
      name: participant.name,
      phone: participant.phone,
      college: participant.college,
      course: participant.course,
      topic: participant.topic,
      token: participant.token,
      elapsedMinutes,
      isActive, // ✅ added
      startTime, // ✅ added
    });
  } catch (err) {
    console.error("Error verifying participant:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};