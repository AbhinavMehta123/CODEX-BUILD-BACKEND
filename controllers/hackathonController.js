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

// ✅ STOP HACKATHON
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
      responsesOpen: hackathon.responsesOpen ?? true,
    });
  } catch (err) {
    console.error("Error fetching hackathon status:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ NEW: STOP RESPONSES
export const stopResponses = async (req, res) => {
  try {
    const hackathon = await Hackathon.findOne();
    if (!hackathon) return res.status(404).json({ message: "No hackathon found" });

    hackathon.responsesOpen = false; // 🔒 lock submissions
    await hackathon.save();

    // 🛑 Emit to all participants (frontend can disable "Submit")
    const io = req.app.get("io");
    if (io) io.emit("stop_responses");

    res.status(200).json({ message: "Participant responses stopped successfully" });
  } catch (err) {
    console.error("Error stopping responses:", err);
    res.status(500).json({ message: "Server error" });
  }
};