import Hackathon from "../models/Hackathon.js";

// 🧑‍💼 Admin — Start hackathon
export const startHackathon = async (req, res) => {
  try {
    let hackathon = await Hackathon.findOne();
    const startTime = new Date();

    if (!hackathon) hackathon = new Hackathon();

    hackathon.startTime = startTime;
    hackathon.isActive = true;
    await hackathon.save();

    res.status(200).json({
      message: "Hackathon started successfully!",
      startTime,
    });
  } catch (err) {
    console.error("Error starting hackathon:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🧑‍💼 Admin — Stop hackathon
export const stopHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findOne();
    if (!hackathon) return res.status(404).json({ message: "No hackathon found" });

    hackathon.isActive = false;
    await hackathon.save();

    res.status(200).json({ message: "Hackathon stopped successfully" });
  } catch (err) {
    console.error("Error stopping hackathon:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🌐 Public — Get hackathon status
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
