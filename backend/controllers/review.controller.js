const Review = require('../models/review.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createReview = catchAsync(async (req, res, next) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    if (!userId || !productId) {
        return next(new AppError('User or Product was not found!.', 400));
    }
    const review = await Review.create(req.body);
    return res.status(201).json({
        status: 'success',
        message: 'Review has been successfully added',
        data: {
            review
        }
    });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
    const reviews = await Review.find();
    return res.status(200).json({
        status: 'success',
        data: {
            reviews
        }
    });
});

exports.getProductReviewsById = catchAsync(async (req, res, next) => {
    const productId = req.params.id;
    if (!productId) {
        return next(new AppError('Product was not found!.', 400));
    }
    const reviews = await Review.findById(productId);
    return res.status(200).json({
        success: 'success',
        data: {
            reviews
        }
    });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
    const reviewId = req.params.id;
    if (!reviewId) {
        return next(new AppError('Review was not found!.', 400));
    }
    await Review.findByIdAndDelete(reviewId);
    return res.status(204).json({
        status: 'success',
        messae: 'Review was deleted!'
    });
});
