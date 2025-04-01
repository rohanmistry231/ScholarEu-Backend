const Scholarship = require("../models/Scholarship");

// @desc    Get all scholarships
// @route   GET /api/scholarships
// @access  Public
exports.getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.status(200).json(scholarships);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get a single scholarship by ID
// @route   GET /api/scholarships/:id
// @access  Public
exports.getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: "Scholarship not found" });
    }
    res.status(200).json(scholarship);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Create a new scholarship
// @route   POST /api/scholarships
// @access  Public
exports.createScholarship = async (req, res) => {
  const { name, amount, deadline, link } = req.body;
  try {
    const newScholarship = new Scholarship({ name, amount, deadline, link });
    await newScholarship.save();
    res.status(201).json(newScholarship);
  } catch (error) {
    res.status(500).json({ message: "Failed to create scholarship", error: error.message });
  }
};

// @desc    Update a scholarship
// @route   PUT /api/scholarships/:id
// @access  Public
exports.updateScholarship = async (req, res) => {
  try {
    const updatedScholarship = await Scholarship.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedScholarship) {
      return res.status(404).json({ message: "Scholarship not found" });
    }
    res.status(200).json(updatedScholarship);
  } catch (error) {
    res.status(500).json({ message: "Failed to update scholarship", error: error.message });
  }
};

// @desc    Delete a scholarship
// @route   DELETE /api/scholarships/:id
// @access  Public
exports.deleteScholarship = async (req, res) => {
  try {
    const deletedScholarship = await Scholarship.findByIdAndDelete(req.params.id);
    if (!deletedScholarship) {
      return res.status(404).json({ message: "Scholarship not found" });
    }
    res.status(200).json({ message: "Scholarship deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete scholarship", error: error.message });
  }
};
