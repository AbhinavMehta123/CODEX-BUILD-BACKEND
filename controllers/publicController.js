import About from "../models/About.js";
import Rule from "../models/Rule.js";

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about || { content: "" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch About content" });
  }
};

export const getRules = async (req, res) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Rules" });
  }
};
