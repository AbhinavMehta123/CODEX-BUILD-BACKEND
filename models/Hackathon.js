import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema({
  startTime: { type: Date, default: null },
  isActive: { type: Boolean, default: false },
});

export default mongoose.model("Hackathon", hackathonSchema);
