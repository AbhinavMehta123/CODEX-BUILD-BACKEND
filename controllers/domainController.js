import Domain from "../models/Domain.js";
import Topic from "../models/Topic.js";

// ✅ Fetch all domains with their topics
export const getDomainsWithTopics = async (req, res) => {
  try {
    const domains = await Domain.find();
    const result = [];

    for (const domain of domains) {
      const topics = await Topic.find({ domain: domain._id }).select("name -_id");
      result.push({
        name: domain.name,
        topics: topics.map((t) => t.name),
      });
    }

    res.json(result);
  } catch (err) {
    console.error("Error fetching domains:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Add new domain (admin use)
export const addDomain = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Domain name required" });

  try {
    const existing = await Domain.findOne({ name });
    if (existing) return res.status(400).json({ message: "Domain already exists" });

    const newDomain = await Domain.create({ name });
    res.status(201).json(newDomain);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Add topic to a domain
export const addTopic = async (req, res) => {
  const { domainName, topicName } = req.body;

  if (!domainName || !topicName)
    return res.status(400).json({ message: "domainName and topicName required" });

  try {
    const domain = await Domain.findOne({ name: domainName });
    if (!domain) return res.status(404).json({ message: "Domain not found" });

    const newTopic = await Topic.create({ name: topicName, domain: domain._id });
    res.status(201).json(newTopic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
