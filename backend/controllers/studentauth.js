const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.models");

// Student Registration
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let student = await User.findOne({ email });
    if (student) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    student = new User({ name, email, password: hashedPassword, role: "student" });

    await student.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Student Login
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await User.findOne({ email, role: "student" });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // res.setHeader("Access-Control-Allow-Credentials", "true");
res.cookie("token", token, {
  httpOnly: true,
  secure: false, // Use false in dev
  sameSite: "Lax",
});

    res.status(200).json({ token, user: { id: student._id, name: student.name, email: student.email, role: "student" } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
