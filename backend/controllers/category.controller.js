const Category = require('../models/category.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createCategory = catchAsync(async (req, res, next) => {
    const category = await Category.create(req.body);
    return res.status(201).json({
        status: 'success',
        message: 'Successfully added new category',
        data: {
            category
        }
    })
});
exports.updateCategory = catchAsync(async (req, res, next) => {
    const catId = req.params.id;
    if (!catId) {
        return next(new AppError('Category Id not found!.', 400));
    }
    const category = await Category.findByIdAndUpdate(catId, req.body, { new: true, runValidators: true });
    return res.status(200).json({
        status: 'success',
        message: 'Updated successfully category',
        data: {
            category
        }
    });
});
exports.getAllCategory = catchAsync(async (req, res, next) => {
    const categories = await Category.find();
    return res.status(200).json({
        status: 'success',
        data: {
            categories
        }
    })
});
exports.deleteCategory = catchAsync(async (req, res, next) => {
    const catId = req.params.id;
    if (!catId) {
        return next(new AppError('Category Id not found!.', 400));
    }
    await Category.findByIdAndDelete(catId);
    return res.status(204).json({
        status: 'success',
        message: 'Successfully deleted!'
    })
});
