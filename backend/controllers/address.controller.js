const Address = require('../models/address.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createAddress = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    if (!userId) {
        return next(new AppError('User was not found!.', 400));
    }
    const address = await Address.create(req.body);
    return res.status(201).json({
        status: 'success',
        message: 'Address has been successfully added.',
        data: {
            address
        }
    });
});

exports.getAddressByUserId = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    if (!userId) {
        return next(new AppError('User was not found!.', 400));
    }
    const address = await Address.find({ userId: userId });
    return res.status(200).json({
        status: 'success',
        data: {
            length: address.length,
            address
        }
    });
});

exports.setDefaultAddress = catchAsync(async (req, res, next) => {
    const addressId = req.params.addressId;
    // const userId = req.params.userId;
    if (!addressId) {
        return next(new AppError('Address was not found!.', 400));
    }
    // Set the isDefault of the record with the given id to true
    const address = await Address.updateOne({ _id: addressId }, { isDefault: true });

    // Set the isDefault of all other records to false
    // await Address.updateMany({ userId: userId, _id: { $ne: addressId } }, { isDefault: false });

    return res.status(200).json({
        status: 'success',
        message: `Set Default Address.`,
        data: {
            address
        }
    });
});

exports.updateAddress = catchAsync(async (req, res, next) => {
    const addressId = req.params.id;
    if (!addressId) {
        return next(new AppError('Address was not found!.', 400));
    }
    const address = await Address.findByIdAndUpdate(addressId, req.body, { new: true, runValidators: true });
    return res.status(200).json({
        status: 'sucsess',
        message: 'Address has been updated',
        data: {
            address
        }
    });
});

exports.deleteAddress = catchAsync(async (req, res, next) => {
    const addressId = req.params.id;
    if (!addressId) {
        return next(new AppError('Address was not found!.', 400));
    }
    await Address.findByIdAndDelete(addressId);
    return res.status(204).json({
        status: 'success',
        message: 'Address has been deleted!'
    });
});
