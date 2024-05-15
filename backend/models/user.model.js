const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        minlength: [6, 'username allow minmum 6 letters']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    dob: {
        type: Date,
        required: [true, 'date of birth is required']
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    mobile: {
        type: String,
        required: [true, 'mobile number is required'],
        min: [10, 'mobile number must contain minimum 10 numbers'],
        max: [10, 'mobile number must contain maximum 10 numbers']
    },
    password: {
        type: String,
        required: [true, 'password is rquired'],
        minlength: [6, 'password contain minimum 6 letters']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: [true, 'role is required']
    },
    isEmailActive: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        default: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png'
    }
}, { timestamps: true });


// Before save save user , it will call this function
userSchema.pre('save', async function (next) {
    // Only run this function if password actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

// userSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'Address',
//         select: 'name mobile hno streetName landmark dist country pincode isDefault isActive'
//     });
//     next();
// });

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);