const blacklistedTokens = new Set();

exports.logout = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    blacklistedTokens.add(token);
    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Middleware to check blacklisted tokens
exports.checkBlacklistedToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (token && blacklistedTokens.has(token)) {
    return res.status(401).json({ message: "Token has been blacklisted. Please log in again." });
  }
  next();
};
