const express = require('express');
const { protect, restrictTo } = require('../controllers/auth.controller');
const { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct, uploadProductImages, resizeProductImages } = require('../controllers/product.controller');

const router = express.Router();

router.route('/').get(getAllProduct).post(protect, restrictTo('admin'), createProduct);
router.route('/:id').get(getProduct).patch(protect, restrictTo('admin'), updateProduct).delete(protect, restrictTo('admin'), deleteProduct);


module.exports = router;