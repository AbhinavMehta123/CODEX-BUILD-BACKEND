import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  course: { type: String, required: true },
  topic: { type: String, required: true },
  startTime: { type: Date, default: Date.now },
  token: { type: String },
});

export default mongoose.model("Participant", participantSchema);