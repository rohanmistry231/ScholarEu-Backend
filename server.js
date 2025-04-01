const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
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

// CORS - Allowing access from anywhere
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/universities", universityRoutes);
app.use("/students", studentRoutes);
app.use("/reviews", reviewRoutes);
app.use("/scholarship", scholarshipRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("🎉 Welcome to UniCorner API! Access from anywhere is allowed.");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});