import mongoose from "mongoose";
import dotenv from "dotenv";
import Domain from "./models/Domain.js";
import Topic from "./models/Topic.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding");
    console.log("📂 Database:", mongoose.connection.name);
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  }
};

const seed = async () => {
  await connectDB();

  await Domain.deleteMany({});
  await Topic.deleteMany({});
  console.log("🧹 Cleared existing Domain and Topic data");

  const domainNames = [
    "AI",
    "Web3",
    "Cybersecurity",
    "Fintech",
    "Cloud Native",
    "Data Science",
    "IoT",
    "AR/VR",
  ];

  const domains = await Domain.insertMany(domainNames.map((n) => ({ name: n })));
  const map = Object.fromEntries(domains.map((d) => [d.name, d._id]));
  console.log(`✅ Inserted ${domains.length} domains`);

  const topics = await Topic.insertMany([
    { name: "Neural Network Visualizer", domain: map["AI"] },
    { name: "Gasless NFT Marketplace", domain: map["Web3"] },
    { name: "Zero-Trust Access Gateway", domain: map["Cybersecurity"] },
    { name: "Automated Yield Aggregator", domain: map["Fintech"] },
    { name: "Edge Computing Orchestrator", domain: map["Cloud Native"] },
    { name: "Real-Time Data Visualizer", domain: map["Data Science"] },
    { name: "Smart Home Controller", domain: map["IoT"] },
    { name: "AR-Based Learning Platform", domain: map["AR/VR"] },
  ]);
  console.log(`✅ Inserted ${topics.length} topics`);

  console.log("🌱 Database seeded successfully!");
  process.exit(0);
};

seed();