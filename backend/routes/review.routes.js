const express = require('express');
const { createReview, getAllReviews, getProductReviewsById, deleteReview } = require('../controllers/review.controller');
const { protect, restrictTo } = require('../controllers/auth.controller');
const router = express.Router();


router.route('/').get(getAllReviews);
router.route('/:userId/product/:productId').post(protect, createReview);
router.route('/:id').get(getProductReviewsById).delete(restrictTo('admin'), deleteReview);

module.exports = router;