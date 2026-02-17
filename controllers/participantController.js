import Participant from "../models/Participant.js";
import Topic from "../models/Topic.js";

export const startBuild = async (req, res) => {
  try {
    const { name, domain } = req.body;
    if (!name || !domain)
      return res.status(400).json({ error: "Name and domain are required" });

    const topics = await Topic.find();
    if (!topics.length)
      return res.status(400).json({ error: "No topics available" });

    const randomTopic =
      topics[Math.floor(Math.random() * topics.length)].name;

    const participant = new Participant({
      name,
      domain,
      topic: randomTopic,
      startTime: new Date(),
    });

    await participant.save();

    res.json({
      topic: randomTopic,
      startTime: participant.startTime,
      participantId: participant._id,
    });
  } catch (error) {
    res.status(500).json({ error: "Error starting build" });
  }
};
