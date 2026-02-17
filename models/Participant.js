import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true },
  topic: { type: String, required: true },
  startTime: { type: Date, default: Date.now },
});

export default mongoose.model("Participant", participantSchema);
