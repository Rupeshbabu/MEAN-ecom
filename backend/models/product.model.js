const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    subTitle: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    salePrice: {
        type: Number,
        required: [true, 'Sale Price required']
    },
    images: {
        type: [String]
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    stocks: {
        type: Number,
        required: [true, 'Stocks is required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    slug: String,
    description: {
        type: String,
        minlength: [120, 'Description allow minimum 120 characters']
    },
    specification: {
        type: [String]
    },
    url: String
}, { timestamps: true });

//DOCUMENT MIDDLEWARE: run before .save() and .create()
productSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

module.exports = mongoose.model('Product', productSchema);