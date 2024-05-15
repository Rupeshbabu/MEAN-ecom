const multer = require('multer');

const catchAsync = require('../utils/catchAsync');
const Product = require('../models/product.model');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images', 400), false);
    }
}

// const upload = multer({ dest: 'public/img/users' });
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadProductImages = upload.fields([
    { name: 'images', maxCount: 5 }
]);

exports.resizeProductImages = catchAsync(async (req, res, next) => {
    if (!req.files.images) return next();

    // 2. Images
    req.body.images = []
    await Promise.all(req.files.images.map(async (file, i) => {

        const filename = `product-${req.params.id}-${Date.now()}-${i + 1}.jpeg`
        await sharp(file.buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`assets/products/${filename}`);
        req.body.images.push(filename);
    })
    );
    next();
});


exports.createProduct = catchAsync(async (req, res, next) => {
    const product = await Product.create(req.body);
    return res.status(201).json({
        status: 'success',
        message: 'Product has been saved successfully.',
        data: {
            product
        }
    });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
    const productId = req.params.id;
    if (!productId) {
        return next(new AppError('Product was not found!', 400));
    }
    const product = await Product.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true });
    return res.status(200).json({
        status: 'success',
        message: 'Product has been Updated Successfully.',
        data: {
            product
        }
    });
});

exports.getAllProduct = catchAsync(async (req, res, next) => {
    const products = await Product.find();
    return res.status(200).json({
        status: 'success',
        data: {
            products
        }
    })
});

exports.getProduct = catchAsync(async (req, res, next) => {
    const productId = req.params.id;
    if (!productId) {
        return next(new AppError('Product was not found!', 400));
    }
    const product = await Product.findOne({ _id: productId });
    return res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
    const productId = req.params.id;
    if (!productId) {
        return next(new AppError('Product was not found!', 400));
    }
    await Product.findByIdAndDelete(productId);
    return res.status(204).json({
        status: 'success',
        message: 'Product has been Deleted Successfully.'
    });
});
