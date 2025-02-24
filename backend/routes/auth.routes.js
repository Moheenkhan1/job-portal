const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const { registerStudent, loginStudent } = require("../controllers/studentauth");
const { registerRecruiter, loginRecruiter } = require("../controllers/recruiterauth");
const { loginAdmin } = require("../controllers/adminauth");
const { logout } = require("../controllers/logout");

// Student Authentication Routes
router.post("/student/register", registerStudent);
router.post("/student/login", loginStudent);

// Recruiter Authentication Routes
router.post("/recruiter/register", registerRecruiter);
router.post("/recruiter/login", loginRecruiter);

// Admin Authentication Route
router.post("/admin/login", loginAdmin);

// Logout Route (for all users)
router.post("/logout", authMiddleware, logout);

module.exports = router;
