const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating allow minimum 1.0'],
        max: [5, 'Rating allow maximum 5.0']
    },
    feedback: {
        type: String,
        required: [true, 'Feedback is requied']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);