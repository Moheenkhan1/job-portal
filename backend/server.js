const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connectTodb = require("./config/db");
const path = require("path");
const authRoutes = require('./routes/auth.routes')


dotenv.config();  
const app = express();

// Middleware and configurations
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: `*`, // Adjust this to your front-end URL  ${process.env.FRONTEND_URI}
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// ✅ Enable trust proxy for cookies in production
app.set("trust proxy", 1);

// MongoDB connection

connectTodb();

app.use('/auth',authRoutes)


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});