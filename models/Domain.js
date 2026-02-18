import mongoose from "mongoose";

const domainSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model("Domain", domainSchema);
