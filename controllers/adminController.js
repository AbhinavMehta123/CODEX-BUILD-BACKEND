import About from "../models/About.js";
import Rule from "../models/Rule.js";
import Topic from "../models/Topic.js";
import Participant from "../models/Participant.js";

// Update About content
export const updateAbout = async (req, res) => {
  try {
    const { content } = req.body;
    const about = await About.findOneAndUpdate({}, { content }, { new: true, upsert: true });
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: "Failed to update About" });
  }
};

// Add a new rule
export const addRule = async (req, res) => {
  try {
    const { content } = req.body;
    const rule = new Rule({ content });
    await rule.save();
    res.json(rule);
  } catch (error) {
    res.status(500).json({ error: "Failed to add rule" });
  }
};

// Add a new topic
export const addTopic = async (req, res) => {
  try {
    const { name } = req.body;
    const topic = new Topic({ name });
    await topic.save();
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: "Failed to add topic" });
  }
};

// Get all participants
export const getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find().sort({ startTime: -1 });
    res.json(participants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch participants" });
  }
};
