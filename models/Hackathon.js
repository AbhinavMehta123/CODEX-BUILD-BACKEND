import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: false },
  startTime: { type: Date, default: null },
  responsesOpen: { type: Boolean, default: true }, 
});

export default mongoose.model("Hackathon", hackathonSchema);