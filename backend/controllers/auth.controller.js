const jwt = require("jsonwebtoken");

const { promisify } = require('util');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.signUp = catchAsync(async (req, res, next) => {
    await User.create(req.body);
    return res.status(201).json({
        status: 'success',
        message: 'User Sign Up Success :)'
    });
});

const signToken = (user) =>
    jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user);

    //Send token in cookies
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    //   if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);

    //Remove password from output
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        // data: {
        //     user
        // }
    })
}

exports.signIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1. Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }
    // 2. Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    // const correct = user.correctPassword(password, user.password);

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }
    // 3. If everything ok, send token to client
    createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    // 1. Getting token and check of it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Your are not logged in! Please log and get access', 401));
    }

    // 2. Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const currentUser = await User.findById(decoded.user._id);
    if (!currentUser) {
        return next(new AppError('The User belonging to this token does no longer exist', 401));
    }

    // 4. Check if user changed password after the token was issued
    // if (currentUser.changePasswordAfter(decoded.iat)) {
    //     return next(new AppError('User recently changed password! Please login again', 401));
    // }

    //GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;

    next();
});

exports.restrictTo =
    (...roles) =>
        (req, res, next) => {
            //roles ['admin', 'lead-guide]. role = 'user'
            if (!roles.includes(req.user.role)) {
                return next(new AppError('You do not have permission to perform this action', 403));
            }

            next();
        };


