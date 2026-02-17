import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema({
  content: { type: String, required: true },
});

export default mongoose.model("Rule", ruleSchema);
