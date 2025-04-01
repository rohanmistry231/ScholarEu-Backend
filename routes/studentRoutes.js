const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// ✅ Create a new student ambassador (single or multiple)
router.post("/", studentController.createStudentAmbassador);

// ✅ Get all student ambassadors
router.get("/", studentController.getAllStudentAmbassadors);

// ✅ Get student ambassadors by university ID  
router.get("/university/:universityId", studentController.getStudentAmbassadorsByUniversity);

// ✅ Get a student ambassador by ID
router.get("/:id", studentController.getStudentAmbassadorById);

// ✅ Update a student ambassador by ID
router.put("/:id", studentController.updateStudentAmbassador);

// ✅ Delete a student ambassador by ID
router.delete("/:id", studentController.deleteStudentAmbassador);

module.exports = router;
