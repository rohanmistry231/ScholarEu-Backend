const mongoose = require("mongoose");

const UniversitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    accreditation: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    tuitionFees: {
      undergraduate: {
        type: String,
        required: false,
      },
      postgraduate: {
        type: String,
        required: false,
      },
    },
    programs: [
      {
        type: String,
        required: true,
      },
    ],
    admissionRequirements: [
      {
        type: String,
        required: true,
      },
    ],
    scholarships: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    campusLife: {
      type: String,
      required: true,
    },
    studentCount: {
      type: Number,
      required: true,
    },
    establishedYear: {
      type: Number,
      required: true,
    },
    facilities: [
      {
        type: String,
        required: true,
      },
    ],
    website: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("University", UniversitySchema);
