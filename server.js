const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
require("dotenv").config();

// Import Routes
const universityRoutes = require("./routes/universityRoutes");
const studentRoutes = require("./routes/studentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const scholarshipRoutes = require("./routes/scholarshipRoutes");

// Initialize Express App
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Secure HTTP headers
app.use(helmet());

// CORS - Allow specific origins (modify as needed)
const allowedOrigins = ["http://localhost:8080", "http://192.168.104.125:8080/"];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rate limiting (100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// Data Sanitization (NoSQL Injection Protection)
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/reviews", reviewRoutes);
app.use("/universities", universityRoutes);
app.use("/students", studentRoutes);
app.use("/scholarship", scholarshipRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("🎉 Welcome to UniCorner API!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
