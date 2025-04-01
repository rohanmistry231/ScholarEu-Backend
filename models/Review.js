const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University", // Assuming you have a University model
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "", // Optional default value
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5, // Ensuring valid ratings
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now, // Automatically set date if not provided
    },
    program: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
