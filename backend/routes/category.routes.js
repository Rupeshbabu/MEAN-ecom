const express = require('express');
const { createCategory, updateCategory, getAllCategory, deleteCategory } = require('../controllers/category.controller');
const { protect, restrictTo } = require('../controllers/auth.controller');


const router = express.Router();

router.route('/').get(getAllCategory).post(protect, restrictTo('admin'), createCategory);
router.route('/:id').patch(protect, restrictTo('admin'), updateCategory).delete(protect, restrictTo('admin'), deleteCategory);

module.exports = router;