import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  content: { type: String, required: true },
});

export default mongoose.model("About", aboutSchema);
