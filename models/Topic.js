import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  domain: { type: mongoose.Schema.Types.ObjectId, ref: "Domain", required: true },
});

export default mongoose.model("Topic", topicSchema);
