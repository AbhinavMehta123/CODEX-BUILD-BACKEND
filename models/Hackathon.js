import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: false },
  startTime: { type: Date, default: null },
});

export default mongoose.model("Hackathon", hackathonSchema);
