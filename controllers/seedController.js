import Domain from "../models/Domain.js";
import Topic from "../models/Topic.js";

// 🧠 PREDEFINED DATA
const seedData = {
  domains: [
    "AI",
    "Web3",
    "Cybersecurity",
    "Fintech",
    "Cloud Native",
    "Data Science",
    "IoT",
    "AR/VR",
  ],

  topics: {
    AI: [
      "Neural Network Visualizer",
      "Self-Correction Coding Agent",
      "Predictive Infrastructure Bot",
      "AI Resume Analyzer",
      "Intelligent Chat Summarizer",
    ],
    Web3: [
      "Gasless NFT Marketplace",
      "DAO Governance Dashboard",
      "Decentralized Identity Vault",
      "Cross-Chain Token Bridge",
      "Smart Contract Auditor AI",
    ],
    Cybersecurity: [
      "Zero-Trust Access Gateway",
      "Real-Time Threat Map",
      "Encrypted Packet Sniffer",
      "Passwordless Auth System",
      "AI-Driven Intrusion Detector",
    ],
    Fintech: [
      "Automated Yield Aggregator",
      "Fractional Asset Protocol",
      "Real-Time Fraud Detector",
      "Crypto Portfolio Tracker",
      "Micro-Lending Smart App",
    ],
    "Cloud Native": [
      "Edge Computing Orchestrator",
      "Serverless Event Mesh",
      "Multi-Cloud Load Balancer",
      "Container Auto-Scaler",
      "Distributed Cache Monitor",
    ],
    "Data Science": [
      "Real-Time Data Visualizer",
      "ML Model Version Tracker",
      "Data Pipeline Health Monitor",
      "Synthetic Data Generator",
      "Time-Series Forecast Platform",
    ],
    IoT: [
      "Smart Home Controller",
      "IoT Energy Optimizer",
      "Vehicle Tracking Network",
      "Smart Agriculture System",
      "Remote Sensor Data Hub",
    ],
    "AR/VR": [
      "AR-Based Learning Platform",
      "VR Collaboration Workspace",
      "Immersive Product Simulator",
      "Mixed Reality Dashboard",
      "AR Fitness Tracker",
    ],
  },
};

// 🌱 SEED FUNCTION
export const seedDatabase = async (req, res) => {
  try {
    await Domain.deleteMany({});
    await Topic.deleteMany({});

    // Insert domains
    const domainDocs = await Domain.insertMany(
      seedData.domains.map((name) => ({ name }))
    );

    // Map domain names to IDs
    const domainMap = Object.fromEntries(
      domainDocs.map((d) => [d.name, d._id])
    );

    // Insert topics
    const allTopics = [];
    for (const [domainName, topics] of Object.entries(seedData.topics)) {
      const domainId = domainMap[domainName];
      topics.forEach((t) => allTopics.push({ name: t, domain: domainId }));
    }

    await Topic.insertMany(allTopics);

    res.status(200).json({
      message: "🌱 Database seeded successfully!",
      domains: domainDocs.length,
      topics: allTopics.length,
    });
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    res.status(500).json({ message: "Error seeding database", error: err });
  }
};
