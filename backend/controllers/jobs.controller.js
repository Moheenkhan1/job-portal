const Job = require('../models/Jobs.models');
const Application = require('../models/Application.model');

module.exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports.addJob = async (req, res) => {
    try {
      const { title, company, location, description, requirements, salaryRange } = req.body;
      console.log(req.user)
      const recruiter = req.user.id
  
      if (!title || !company || !location || !description || !recruiter) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }
  
      const newJob = new Job({
        title,
        company,
        location,
        description,
        requirements: requirements || [], // Default to empty array if not provided
        salaryRange: salaryRange || "",  // Default to empty string if not provided
        recruiter,
        applicants: [], // Start with an empty applicant list
      });
  
      await newJob.save();
      res.status(201).json(newJob);
    } catch (error) {
      console.error("Error adding job:", error);
      res.status(500).json({ message: "Error adding job" });
    }
  };
  

module.exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job' });
  }
};


module.exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('job').populate('student');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports.updateApplication = async (req, res) => {
    try {
      const { status } = req.body;
      const updatedApplication = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
      res.json(updatedApplication);
    } catch (error) {
      res.status(500).json({ message: "Error updating application status" });
    }
  };
