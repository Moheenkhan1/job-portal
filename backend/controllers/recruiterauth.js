const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.models");
const Recruiter = require("../models/Recruiter.model");

// Recruiter Registration
exports.registerRecruiter = async (req, res) => {
  try {
    const { name, email, password, companyName, companyWebsite, phone } = req.body;

    let recruiterUser = await User.findOne({ email });
    if (recruiterUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    recruiterUser = new User({ name, email, password: hashedPassword, role: "recruiter" });

    await recruiterUser.save();

    const recruiter = new Recruiter({
      userId: recruiterUser._id,
      companyName,
      companyWebsite,
      email,
    });

    await recruiter.save();


    res.status(201).json({ message: "Recruiter registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Recruiter Login
exports.loginRecruiter = async (req, res) => {
  try {
    const { email, password } = req.body;

    const recruiterUser = await User.findOne({ email, role: "recruiter" });
    if (!recruiterUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, recruiterUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: recruiterUser._id, role: "recruiter" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Use false in dev
      sameSite: "Lax",
    });

    res.json({ token, user: { id: recruiterUser._id, name: recruiterUser.name, email: recruiterUser.email, role: "recruiter" } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
