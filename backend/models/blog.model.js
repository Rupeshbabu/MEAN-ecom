const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        maxlength: [120, 'Blog title allow maximum 120 characters only']
    },
    subTitle: {
        type: String
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    description: {
        type: String,
        required: [true, 'Blog Description is required'],
        minlength: [200, 'Blog Description allow minimum 200 characters']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);