import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io"; 

import publicRoutes from "./routes/publicRoutes.js";
import participantRoutes from "./routes/participantRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import domainRoutes from "./routes/domainRoutes.js";
import hackathonRoutes from "./routes/hackathonRoutes.js";

dotenv.config();
const app = express();
const server = http.createServer(app); // ✅ Create HTTP server for socket.io

// ✅ Initialize socket.io
const io = new Server(server, {
  cors: {
    origin: [
      "https://codexadminportal.netlify.app/",
      "https://codexbuild.netlify.app/",
      "http://localhost:3000",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "https://codexadminportal.netlify.app/",
    "https://codexbuild.netlify.app/",
    "http://localhost:3000",
    "http://localhost:5173"
  ],
}));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api", publicRoutes);
app.use("/api", participantRoutes);
app.use("/api", adminRoutes);
app.use("/api", domainRoutes);
app.use("/api", hackathonRoutes);

app.get("/", (req, res) => res.send("Codex Backend Running 🧠"));

// ✅ Socket.IO logic
io.on("connection", (socket) => {
  console.log("🟢 A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 A client disconnected:", socket.id);
  });

  // 🧑‍💼 Admin triggers this event to start hackathon
  socket.on("start_hackathon", (startTime) => {
    console.log("🚀 Hackathon started by admin");
    io.emit("hackathon_started", startTime); // broadcast to all participants
  });
});

// ✅ Start both HTTP + WebSocket servers
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
