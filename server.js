import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import publicRoutes from "./routes/publicRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import participantRoutes from "./routes/participantRoutes.js"; 
import domainRoutes from "./routes/domainRoutes.js";
import seedRoutes from "./routes/seedRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api", publicRoutes);
app.use("/api", adminRoutes);
app.use("/api/participant", participantRoutes);
app.use("/api", domainRoutes);  
app.use("/api", seedRoutes);

app.get("/", (req, res) => res.send("Codex Backend Running 🧠"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
