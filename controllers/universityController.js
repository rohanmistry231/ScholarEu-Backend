const University = require("../models/University");

// ✅ Create a new university (single or multiple)
exports.createUniversity = async (req, res) => {
  try {
    let universities = Array.isArray(req.body)
      ? await University.insertMany(req.body) // Multiple universities
      : await new University(req.body).save(); // Single university

    res.status(201).json({ success: true, message: "University added!", data: universities });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Get all universities
exports.getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find().select("name logo location country rating").lean();
    res.status(200).json({ success: true, data: universities });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch universities.", error: error.message });
  }
};

// ✅ Get a university by ID
exports.getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id).lean();
    if (!university) {
      return res.status(404).json({ success: false, message: "University not found" });
    }
    res.status(200).json({ success: true, data: university });
  } catch (error) {
    console.error("Error fetching university by ID:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Update a university by ID
exports.updateUniversity = async (req, res) => {
  try {
    const updatedUniversity = await University.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUniversity) return res.status(404).json({ success: false, message: "University not found." });

    res.status(200).json({ success: true, message: "University updated!", data: updatedUniversity });
  } catch (error) {
    res.status(400).json({ success: false, message: "Update failed.", error: error.message });
  }
};

// ✅ Delete a university by ID
exports.deleteUniversity = async (req, res) => {
  try {
    const deletedUniversity = await University.findByIdAndDelete(req.params.id);
    if (!deletedUniversity) return res.status(404).json({ success: false, message: "University not found." });

    res.status(200).json({ success: true, message: "University deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Deletion failed.", error: error.message });
  }
};
