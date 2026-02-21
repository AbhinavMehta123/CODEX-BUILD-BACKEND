import mongoose from "mongoose";

const workSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  projectDescription: { type: String, required: true },
  githubRepo: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model("WorkSubmission", workSubmissionSchema);