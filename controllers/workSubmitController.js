import WorkSubmit from "../models/WorkSubmit.js";

// 📤 Submit Work
export const submitWork = async (req, res) => {
  try {
    const { name, phone, projectDescription, githubRepo } = req.body;

    if (!name || !phone || !projectDescription || !githubRepo) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newSubmission = new WorkSubmit({
      name,
      phone,
      projectDescription,
      githubRepo,
    });

    await newSubmission.save();

    return res.status(201).json({
      success: true,
      message: "Work submitted successfully!",
      submission: newSubmission,
    });
  } catch (error) {
    console.error("Error submitting work:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// 📄 Get all submissions (Admin)
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await WorkSubmit.find().sort({ submittedAt: -1 });
    return res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ success: false, message: "Server error fetching submissions." });
  }
};

// 🧾 Get a single participant submission
export const getSubmissionByName = async (req, res) => {
  try {
    const { name } = req.params;
    const submission = await WorkSubmit.findOne({ name });

    if (!submission)
      return res.status(404).json({ success: false, message: "Submission not found." });

    return res.status(200).json(submission);
  } catch (error) {
    console.error("Error fetching submission:", error);
    res.status(500).json({ success: false, message: "Error fetching submission." });
  }
};