const Job = require("../models/Jobs.models");
const Application = require("../models/Application.model");
const Recruiter = require("../models/Recruiter.model");
const User = require('../models/User.models')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Job Recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const { skills } = req.user; 
    const recommendedJobs = await Job.find({
      requiredSkills: { $in: skills },
    });

    res.json(recommendedJobs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recommendations" });
  }
};

// Apply for a Job with Resume
exports.applyJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { resumeLink } = req.body;

    const studentId = req.user.id;
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const recruiter = await User.findById(job.recruiter);
    if (!recruiter) return res.status(404).json({ message: "Recruiter not found" });

    const existingApplication = await Application.findOne({ job: id, student: studentId });
    if (existingApplication) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    const application = new Application({
      job: id,
      student: studentId,
      recruiter: recruiter._id,
      resumeLink,
    });

    await application.save();

    await User.findByIdAndUpdate(studentId, { 
      $addToSet: { appliedJobs: id } // Prevents duplicate entries
    });

    res.json({ message: "Application submitted successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error applying for job" });
  }
};

// Get Applied Jobs
exports.getAppliedJobs = async (req, res) => {
  try {
    const studentId = req.user.id;
    const appliedJobs = await Application.find({ student: studentId })
      .populate({
        path: "job",
        select: "title company location salary description requirements", // Select necessary fields
      })
      .populate({
        path: "recruiter",
        select: "name email company", // Recruiter details
      });
      console.log(appliedJobs)

    res.json(appliedJobs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching applied jobs" });
  }
};

// Withdraw Application
exports.withdrawApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    const studentId = req.user.id;

    await Application.findOneAndDelete({ job: jobId, student: studentId });

    res.json({ message: "Application withdrawn successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error withdrawing application" });
  }
};

module.exports.savedJobs = async (req, res) => {
  try {
      const student = await User.findById(req.user.id).populate("savedJobs");
      console.log(student)
      res.status(200).json(student.savedJobs);
  } catch (error) {
      res.status(500).json({ message: "Error fetching saved jobs", error });
  }
}

module.exports.saveJob = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId)
    console.log(req.params)
    const { id } = req.params;

    await User.findByIdAndUpdate(userId, { $addToSet: { savedJobs: id } });

    res.json({ message: "Job saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving job" });
  }
}

module.exports.jobListings = async (req, res) => {
  try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
  } catch (error) {
      res.status(500).json({ message: "Error fetching jobs", error });
  }
}

module.exports.changePassword = async (req, res) => {
  try {
    console.log(req.body)
      const { currentPassword, newPassword } = req.body;

      // Fetch student from database
      const student = await User.findById(req.user.id);
      if (!student) {
          return res.status(404).json({ message: "User not found" });
      }

      // Compare current password
      const isMatch = await bcrypt.compare(currentPassword, student.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Current password is incorrect" });
      }

      // Hash new password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      student.password = hashedPassword;
      await student.save();

      res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Error changing password", error });
  }
}
module.exports.getProfile = async (req, res) => {
  try {
      const student = await User.findById(req.user.id);
      res.status(200).json(student);
  } catch (error) {
      res.status(500).json({ message: "Error fetching profile", error });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
      const updatedStudent = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
      res.status(200).json(updatedStudent);
  } catch (error) {
      res.status(500).json({ message: "Error updating profile", error });
  }
}