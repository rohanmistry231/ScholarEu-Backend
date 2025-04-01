const StudentAmbassador = require("../models/Student");

// ✅ Create a new student ambassador (single or multiple)
exports.createStudentAmbassador = async (req, res) => {
  try {
    let studentAmbassadors;

    if (Array.isArray(req.body)) {
      // Ensure no `id` field is present in bulk inserts
      const sanitizedData = req.body.map((item) => {
        const { id, ...rest } = item; // Remove `id` if present
        return rest;
      });

      studentAmbassadors = await StudentAmbassador.insertMany(sanitizedData);
    } else {
      const { id, ...studentData } = req.body; // Remove `id` if present
      studentAmbassadors = new StudentAmbassador(studentData);
      await studentAmbassadors.save();
    }

    res.status(201).json({
      success: true,
      message: "Student Ambassador(s) added!",
      data: studentAmbassadors,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// ✅ Get all student ambassadors
exports.getAllStudentAmbassadors = async (req, res) => {
  try {
    const studentAmbassadors = await StudentAmbassador.find();
    res.status(200).json({ success: true, data: studentAmbassadors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch student ambassadors.", error: error.message });
  }
};

// ✅ Get student ambassadors by university ID  
exports.getStudentAmbassadorsByUniversity = async (req, res) => {  
  try {  
    const { universityId } = req.params; // Get the universityId from the request parameters  
    const studentAmbassadors = await StudentAmbassador.find({ universityId }); // Find ambassadors based on universityId  

    // Check if any student ambassadors were found  
    if (!studentAmbassadors.length) {  
      return res.status(404).json({ success: false, message: "No student ambassadors found for this university" });  
    }  

    // Return found student ambassadors  
    res.status(200).json({ success: true, data: studentAmbassadors });  
  } catch (error) {  
    // Return an error response if there was a failure  
    res.status(500).json({ success: false, message: "Failed to fetch student ambassadors.", error: error.message });  
  }  
};

// ✅ Get a student ambassador by ID
exports.getStudentAmbassadorById = async (req, res) => {
  try {
    const studentAmbassador = await StudentAmbassador.findById(req.params.id);
    if (!studentAmbassador)
      return res.status(404).json({ success: false, message: "Student Ambassador not found" });

    res.status(200).json({ success: true, data: studentAmbassador });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving student ambassador.", error: error.message });
  }
};

// ✅ Update a student ambassador by ID
exports.updateStudentAmbassador = async (req, res) => {
  try {
    const updatedStudentAmbassador = await StudentAmbassador.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedStudentAmbassador)
      return res.status(404).json({ success: false, message: "Student Ambassador not found" });

    res.status(200).json({ success: true, message: "Student Ambassador updated!", data: updatedStudentAmbassador });
  } catch (error) {
    res.status(400).json({ success: false, message: "Update failed.", error: error.message });
  }
};

// ✅ Delete a student ambassador by ID
exports.deleteStudentAmbassador = async (req, res) => {
  try {
    const deletedStudentAmbassador = await StudentAmbassador.findByIdAndDelete(req.params.id);
    if (!deletedStudentAmbassador)
      return res.status(404).json({ success: false, message: "Student Ambassador not found" });

    res.status(200).json({ success: true, message: "Student Ambassador deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Deletion failed.", error: error.message });
  }
};
