const multer = require('multer');

const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');
const Address = require('../models/address.model');
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

exports.uploadUserPhoto = upload.single('profilePic');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`assets/users/${req.file.filename}`);

    next();
});

exports.updateProfileDetails = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    if (!userId) {
        return next(new AppError('User was not found!', 400));
    }
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });
    return res.status(200).json({
        status: 'success',
        message: 'User Profile Updated Successfully.',
        data: {
            user
        }
    });
});

// exports.uploadProfilePic = catchAsync(async (req, res, next) => { });

exports.updatePassword = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    const oldPassword = req.body.currentPassword;
    // if (!userId) {
    //     return next(new AppError('User was not found!', 400));
    // }
    // if (!oldPassword) {
    //     return next(new AppError('Password is required!', 400));
    // }
    if (!userId || !oldPassword) {
        return next(new AppError(!userId ? 'User was not found!' : 'Password is required!', 400));
    }

    const user = await User.findById(userId).select('+password');

    if (!user.correctPassword(oldPassword, user.password)) {
        return next(new AppError('Your current password is worng', 401));
    }
    user.password = req.body.password;
    await user.save();
    return res.status(200).json({
        status: 'success',
        message: 'Update Password successfully added.'
    });
});

exports.getUserDetailsById = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    if (!userId) {
        return next(new AppError('User was not found!', 400));
    }
    const user = await User.findOne({ _id: userId });
    // Query related collections (e.g., Address)
    const address = await Address.find({ userId: userId });
    user.address = address;
    const userAndAddress = {
        user, address
    }

    return res.status(200).json({
        status: 'success',
        data: {
            userAndAddress
        },
        data2: {
            user
        }
    });

});

exports.deactivateUserAccount = catchAsync(async (req, res, next) => {

});
