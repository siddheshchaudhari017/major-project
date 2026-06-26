const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsyc.js");
const ExpressError = require("../utils/ExpressError.js");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const reviewController = require("../controllers/reviews.js");


//Reviews
//post reviews route
router.post("/",validateReview,isLoggedIn,wrapAsync(reviewController.createReview));


// Delete reviews Route
router.delete("/:reviewId",isReviewAuthor,isLoggedIn,
    wrapAsync(reviewController.deleteReview)
);

module.exports = router;