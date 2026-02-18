import Domain from "../models/Domain.js";
import Topic from "../models/Topic.js";

// ✅ Fetch all domains with their topics
export const getDomainsWithTopics = async (req, res) => {
  try {
    const domains = await Domain.find();
    const response = [];

    for (const domain of domains) {
      const topics = await Topic.find({ domain: domain._id }).select("name -_id");
      response.push({
        name: domain.name,
        topics: topics.map((t) => t.name),
      });
    }

    res.status(200).json(response);
  } catch (err) {
    console.error("❌ Error fetching domains-with-topics:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
