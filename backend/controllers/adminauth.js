const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.models");

// Admin Login (Admins are manually created in DB)
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminUser = await User.findOne({ email, role: "admin" });
    if (!adminUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: adminUser._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: adminUser._id, name: adminUser.name, email: adminUser.email, role: "admin" } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
