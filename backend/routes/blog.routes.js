const express = require('express');
const { createBlog, getBlog, deleteBlog, getAllBlog, updateBlog } = require('../controllers/blog.controller');
const { protect, restrictTo } = require('../controllers/auth.controller');

const router = express.Router();

router.route('/').get(getAllBlog);

router.use(protect);
router.route('/:id').get(getBlog).post(createBlog).patch(updateBlog).delete(restrictTo('admin'), deleteBlog);

module.exports = router;