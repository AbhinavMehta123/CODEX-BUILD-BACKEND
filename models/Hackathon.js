import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema({
  isActive: { 
    type: Boolean, 
    default: false 
  },
  startTime: { 
    type: Date, 
    default: null 
  },
  
  // Submissions only open when admin clicks "Start" or "Allow Responses"
  responsesOpen: { 
    type: Boolean, 
    default: false 
  }, 
}, { timestamps: true }); // Added timestamps to track when settings were last changed

export default mongoose.model("Hackathon", hackathonSchema);