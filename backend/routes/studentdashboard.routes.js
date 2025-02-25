const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const Student = require("../models/User.models");
const Job = require("../models/Jobs.models");
const Application = require("../models/Application.model");
// const Notification = require("../models/notification.model");
const { 
    getRecommendations, 
    applyJob, 
    getAppliedJobs, 
    withdrawApplication ,
    savedJobs,
    saveJob,
    jobListings,
    changePassword,
    getProfile,
    updateProfile
  } = require("../controllers/studentdashboard");

// Profile Management
router.get("/profile", authMiddleware, getProfile )

router.put("/profile", authMiddleware,updateProfile );

// Job Listings & Applications
router.get("/jobs", jobListings);

router.post("/jobs/apply/:id",authMiddleware, applyJob);

router.post("/jobs/save/:id", authMiddleware, saveJob);

// Saved Jobs & Applied Jobs
router.get("/saved-jobs", authMiddleware, savedJobs);

router.get("/applied-jobs", authMiddleware, getAppliedJobs);

// Settings & Security
router.put("/change-password", authMiddleware, changePassword );

router.get("/recommendations", authMiddleware, getRecommendations);

router.delete("/withdraw/:jobId", authMiddleware, withdrawApplication);


module.exports = router;
