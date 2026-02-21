import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io"; 

// Routes
import publicRoutes from "./routes/publicRoutes.js";
import participantRoutes from "./routes/participantRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import domainRoutes from "./routes/domainRoutes.js";
import hackathonRoutes from "./routes/hackathonRoutes.js";
import workSubmitRoutes from "./routes/workSubmitRoutes.js"


dotenv.config();
const app = express();
const server = http.createServer(app);

// ✅ Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: [
      "https://codexbuildadminportal.netlify.app",
      "https://codexbuild.netlify.app",
      "http://localhost:3000",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST"],
  },
});

// Make io available inside Express routes
app.set("io", io);

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://codexbuildadminportal.netlify.app",
      "https://codexbuild.netlify.app",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
  })
);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ API Routes
app.use("/api", publicRoutes);
app.use("/api", participantRoutes);
app.use("/api", adminRoutes);
app.use("/api", domainRoutes);
app.use("/api", hackathonRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/work", workSubmitRoutes);

app.get("/", (req, res) => res.send("Codex Backend Running 🧠"));

// =========================
// ✅ SOCKET.IO CONNECTIONS
// =========================
let timerInterval;
let remainingTime = 0;

io.on("connection", (socket) => {
  console.log("🟢 A client connected:", socket.id);

  socket.on("join_hackathon", () => {
    socket.emit("timer_update", remainingTime);
  });

  // Admin starts hackathon timer
  socket.on("start_hackathon", (duration = 110 * 60) => {
    console.log("🚀 Hackathon started for", duration, "seconds");
    clearInterval(timerInterval);
    remainingTime = duration;

    io.emit("hackathon_started", { duration: remainingTime });

    timerInterval = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        io.emit("timer_update", remainingTime);
      } else {
        clearInterval(timerInterval);
        remainingTime = 0; // Reset
        io.emit("hackathon_ended");
        io.emit("stop_responses"); // 🔒 Auto-lock when time hits zero
      }
    }, 1000);
  });

  // Admin stops hackathon manually
  socket.on("stop_hackathon", () => {
    clearInterval(timerInterval);
    remainingTime = 0;
    io.emit("hackathon_stopped");
    io.emit("stop_responses"); // 🔒 Also lock responses
    console.log("🛑 Hackathon stopped by admin");
  });

  // ✅ New Socket Listeners for Response Control
  socket.on("stop_responses", () => {
    console.log("🔒 Submissions locked by admin");
    io.emit("stop_responses"); 
  });

  socket.on("allow_responses", () => {
    console.log("🔓 Submissions opened by admin");
    io.emit("allow_responses");
  });

  socket.on("disconnect", () => {
    console.log("🔴 A client disconnected:", socket.id);
  });
});

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));