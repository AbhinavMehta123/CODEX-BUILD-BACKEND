import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema({
  sectionNumber: { type: String, required: true },
  title: { type: String, required: true },
  titleAccent: { type: String, required: true },
  cards: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      desc: { type: String, required: true },
      tag: { type: String, required: true },
    },
  ],
});

export default mongoose.model("Rule", ruleSchema);
