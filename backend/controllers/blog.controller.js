const Blog = require('../models/blog.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.createBlog = catchAsync(async (req, res, next) => {
    const blog = await Blog.create(req.body);
    return res.status(201).json({
        status: 'success',
        message: 'Blog has been successfully added.',
        data: {
            blog
        }
    })
});
exports.updateBlog = catchAsync(async (req, res, next) => {
    const blogId = req.params.id;
    if (!blogId) {
        return next(new AppError('Blog was not found!.', 400));
    }
    const blog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true, runValidators: true });
    return res.status(200).json({
        status: 'success',
        message: 'Blog has been successfully updated.',
        data: {
            blog
        }
    });
});
exports.getAllBlog = catchAsync(async (req, res, next) => {
    const blogs = await Blog.find();
    return res.status(200).json({
        status: 'success',
        data: {
            blogs
        }
    });
});
exports.getBlog = catchAsync(async (req, res, next) => {
    const blogId = req.params.id;
    if (!blogId) {
        return next(new AppError('Blog was not found!.', 400));
    }
    const blog = await Blog.findOne({ _id: blogId });
    return res.status(200).json({
        status: 'success',
        data: {
            blog
        }
    });
});
exports.deleteBlog = catchAsync(async (req, res, next) => {
    const blogId = req.params.id;
    if (!blogId) {
        return next(new AppError('Blog was not found!.', 400));
    }
    await Blog.findByIdAndUpdate(blogId);
    return res.status(204).json({
        status: 'success',
        message: 'Blog has been Deleted Successfully.'
    });
});
