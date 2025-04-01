const Review = require("../models/Review");

// ✅ Create a new review
exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ success: true, message: "Review added!", data: review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Get all reviews with pagination
exports.getAllReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const reviews = await Review.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalReviews = await Review.countDocuments();

    res.status(200).json({
      success: true,
      totalPages: Math.ceil(totalReviews / limit),
      currentPage: Number(page),
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get reviews by university ID
exports.getReviewsByUniversity = async (req, res) => {
  try {
    const { universityId } = req.params;
    const reviews = await Review.find({ universityId });

    if (!reviews.length) {
      return res.status(404).json({ success: false, message: "No reviews found for this university" });
    }

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get a review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update a review by ID
exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedReview) return res.status(404).json({ success: false, message: "Review not found" });

    res.status(200).json({ success: true, message: "Review updated!", data: updatedReview });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Delete a review by ID
exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ success: false, message: "Review not found" });

    res.status(200).json({ success: true, message: "Review deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
