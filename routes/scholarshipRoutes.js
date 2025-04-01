const express = require("express");
const {
  getAllScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
} = require("../controllers/scholarshipController");

const router = express.Router();

router.get("/", getAllScholarships);
router.get("/:id", getScholarshipById);
router.post("/", createScholarship);
router.put("/:id", updateScholarship);
router.delete("/:id", deleteScholarship);

module.exports = router;
