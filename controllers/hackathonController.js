import Hackathon from "../models/Hackathon.js";

// ✅ START HACKATHON
export const startHackathon = async (req, res) => {
  try {
    let hackathon = await Hackathon.findOne();
    const startTime = new Date();

    if (!hackathon) hackathon = new Hackathon();

    hackathon.startTime = startTime;
    hackathon.isActive = true;
    hackathon.responsesOpen = true; // ✅ Allow responses when started
    await hackathon.save();

    const io = req.app.get("io");
    if (io) io.emit("hackathon_started", startTime);

    res.status(200).json({
      message: "Hackathon started successfully!",
      startTime,
    });
  } catch (err) {
    console.error("Error starting hackathon:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ STOP HACKATHON
export const stopHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findOne();
    if (!hackathon) return res.status(404).json({ message: "No hackathon found" });

    hackathon.isActive = false;
    hackathon.startTime = null;
    hackathon.responsesOpen = false; // 🔒 Auto-lock submissions when event stops
    await hackathon.save();

    const io = req.app.get("io");
    if (io) {
      io.emit("hackathon_stopped");
      io.emit("stop_responses"); // Notify clients to lock UI
    }

    res.status(200).json({ message: "Hackathon stopped successfully" });
  } catch (err) {
    console.error("Error stopping hackathon:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET STATUS
export const getHackathonStatus = async (req, res) => {
  try {
    const hackathon = await Hackathon.findOne();
    if (!hackathon) {
      return res.status(200).json({ isActive: false, responsesOpen: false });
    }

    res.status(200).json({
      isActive: hackathon.isActive,
      startTime: hackathon.startTime,
      responsesOpen: hackathon.responsesOpen ?? false,
    });
  } catch (err) {
    console.error("Error fetching hackathon status:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ NEW: ALLOW RESPONSES (The function you requested)
export const allowResponses = async (req, res) => {
  try {
    const hackathon = await Hackathon.findOne();
    if (!hackathon) return res.status(404).json({ message: "No hackathon found" });

    hackathon.responsesOpen = true; // 🔓 Open submissions
    await hackathon.save();

    const io = req.app.get("io");
    if (io) io.emit("allow_responses");

    res.status(200).json({ message: "Participant responses allowed successfully" });
  } catch (err) {
    console.error("Error allowing responses:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ STOP RESPONSES
export const stopResponses = async (req, res) => {
  try {
    const hackathon = await Hackathon.findOne();
    if (!hackathon) return res.status(404).json({ message: "No hackathon found" });

    hackathon.responsesOpen = false; // 🔒 Lock submissions
    await hackathon.save();

    const io = req.app.get("io");
    if (io) io.emit("stop_responses");

    res.status(200).json({ message: "Participant responses stopped successfully" });
  } catch (err) {
    console.error("Error stopping responses:", err);
    res.status(500).json({ message: "Server error" });
  }
};