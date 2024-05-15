const Coupon = require('../models/coupons.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const generateCouponCode = require('../utils/randomGenerate');

exports.createCoupon = catchAsync(async (req, res, next) => {
    const coupon = await Coupon.create(req.body);
    return res.status(201).json({
        status: 'success',
        message: 'Successfully added Coupon :)',
        data: {
            coupon
        }
    })
});

exports.updateCoupon = catchAsync(async (req, res, next) => {
    const couponId = req.params.id;
    if (!couponId) {
        return next(new AppError('Coupon was not found!', 400));
    }
    const coupon = await Coupon.findByIdAndUpdate(couponId, req.body, { new: true, runValidators: true });
    return res.status(200).json({
        status: 'success',
        message: 'Successfully Coupon updated.',
        data: {
            coupon
        }
    });
});

exports.getAllCoupon = catchAsync(async (req, res, next) => {
    const coupons = await Coupon.find();
    const couponTypeSelection = req.query.selection;
    const formattedCoupon = coupons.filter(coupon => coupon.isActive).map(coupon => {
        if (coupon.couponType === 'percentage') {
            return {
                id: coupon._id,
                title: coupon.title,
                code: coupon.couponCode,
                discount: `${coupon.discount}%`,
                expiryDate: coupon.expiryDate
            }
        } else if (coupon.couponType === 'flat') {
            return {
                id: coupon._id,
                title: coupon.title,
                code: coupon.couponCode,
                discount: coupon.discount,
                expiryDate: coupon.expiryDate
            }
        } else {
            return null;
        }
    });
    return res.status(200).json({
        status: 'success',
        data: {
            formattedCoupon
        }
    });
});

exports.deleteCoupon = catchAsync(async (req, res, next) => {
    const couponId = req.params.id;
    if (!couponId) {
        return next(new AppError('Coupon was not found!', 400));
    }
    await Coupon.findByIdAndDelete(couponId);
    return res.status(200).json({
        status: 'success',
        message: 'Successfully coupon deleted.'
    });
});

exports.generateCouponCode = catchAsync(async (req, res, next) => {
    const couponCode = generateCouponCode(20);
    return res.status(200).json({
        status: 'success',
        data: {
            couponCode
        }
    });
});
