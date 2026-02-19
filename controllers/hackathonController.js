import Hackathon from "../models/Hackathon.js";

export const startHackathon = async (req, res) => {
  try {
    let hackathon = await Hackathon.findOne();
    const startTime = new Date();

    if (!hackathon) hackathon = new Hackathon();

    hackathon.startTime = startTime;
    hackathon.isActive = true;
    await hackathon.save();

    // 🔥 Emit event to all participants
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

export const stopHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findOne();
    if (!hackathon) return res.status(404).json({ message: "No hackathon found" });

    hackathon.isActive = false;
    hackathon.startTime = null;
    await hackathon.save();

    // 🛑 Emit stop event
    const io = req.app.get("io");
    if (io) io.emit("hackathon_stopped");

    res.status(200).json({ message: "Hackathon stopped successfully" });
  } catch (err) {
    console.error("Error stopping hackathon:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getHackathonStatus = async (req, res) => {
  try {
    const hackathon = await Hackathon.findOne();
    if (!hackathon) {
      return res.status(200).json({ isActive: false });
    }

    res.status(200).json({
      isActive: hackathon.isActive,
      startTime: hackathon.startTime,
    });
  } catch (err) {
    console.error("Error fetching hackathon status:", err);
    res.status(500).json({ message: "Server error" });
  }
};
