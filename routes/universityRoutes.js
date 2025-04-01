const express = require("express");
const router = express.Router();
const universityController = require("../controllers/universityController");

// ✅ Create a new university
router.post("/", universityController.createUniversity);

// ✅ Get all universities (with pagination support)
router.get("/", universityController.getAllUniversities);

// ✅ Get a university by ID
router.get("/:id", universityController.getUniversityById);

// ✅ Update a university by ID
router.put("/:id", universityController.updateUniversity);

// ✅ Delete a university by ID
router.delete("/:id", universityController.deleteUniversity);

module.exports = router;
