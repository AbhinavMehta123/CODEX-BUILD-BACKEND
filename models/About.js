import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  sectionNumber: String,
  title: String,
  titleAccent: String,
  description: [String],
  stats: [{ label: String, value: String }],
  logs: [{ time: String, text: String, highlight: Boolean }],
  rules: [String],
});

export default mongoose.model("About", aboutSchema);
