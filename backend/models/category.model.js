const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tags: [String],
    image: {
        type: String,
        default: 'default.jpeg'
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);