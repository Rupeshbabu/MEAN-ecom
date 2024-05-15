const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    mobile: {
        type: Number,
        required: [true, 'Mobile Number is required']
    },
    hno: {
        type: String,
        required: [true, 'House No./Flat No. is required']
    },
    streetName: {
        type: String,
        required: [true, 'Street Name/Area Name is required']
    },
    landmark: String,
    dist: String,
    country: {
        type: String,
        enum: ['India'],
        default: 'India'
    },
    pincode: Number,
    isDefault: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: String,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);