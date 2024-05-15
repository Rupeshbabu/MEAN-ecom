const express = require('express');
const { createCoupon, deleteCoupon, generateCouponCode, getAllCoupon, updateCoupon } = require('../controllers/coupons.controller');
const { protect, restrictTo } = require('../controllers/auth.controller');

const router = express.Router();

router.route('/generate-coupon').get(generateCouponCode);

router.use(protect, restrictTo('admin'));

router.route('/').post(createCoupon).get(getAllCoupon);
router.route('/:id').patch(updateCoupon).delete(deleteCoupon);

module.exports = router;