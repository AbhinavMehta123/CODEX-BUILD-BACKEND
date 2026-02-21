import WorkSubmission from "../models/WorkSubmit.js";
import Hackathon from "../models/Hackathon.js"; // ✅ Import the status model

// 🧩 Participant submission
export const submitWork = async (req, res) => {
  try {
    // 1. Check if submissions are actually open in the database
    const status = await Hackathon.findOne();
    if (!status || !status.responsesOpen) {
      return res.status(403).json({ 
        success: false, 
        message: "Submissions are currently closed by the admin." 
      });
    }

    const { name, phone, projectDescription, githubRepo } = req.body;

    // 2. Validation
    if (!name || !phone || !projectDescription || !githubRepo) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // 3. Save Submission
    const newSubmission = new WorkSubmission({
      name,
      phone,
      projectDescription,
      githubRepo,
    });

    await newSubmission.save();

    res.status(201).json({ success: true, message: "Work submitted successfully!" });
  } catch (err) {
    console.error("Work submission error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🧾 Admin: get all submissions
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await WorkSubmission.find().sort({ submittedAt: -1 });
    res.json({ success: true, submissions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🧾 Admin: get submission by name
export const getSubmissionByName = async (req, res) => {
  try {
    const { name } = req.params;
    const submission = await WorkSubmission.findOne({ name });
    if (!submission) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};