const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Coupon Title is required'],
        maxlength: [120, 'Coupon Title allow maximum 120 characters']
    },
    couponCode: {
        type: String,
        required: [true, 'Coupon Code is required'],
        minlength: [20, 'Coupon Code enter must 20 characters'],
        maxlength: [20, 'Coupon Code enter must 20 characters']
    },
    discount: {
        type: Number,
        required: [true, 'Coupons price is required']
    },
    couponType: {
        type: String,
        enum: ['flat', 'percentage']
    },
    expiryDate: {
        type: Date,
        required: [true, 'Coupon Expiry Date is required']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);