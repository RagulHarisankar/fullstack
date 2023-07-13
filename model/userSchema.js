const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    mobile: {
        required: true,
        type: Number,
    },
    password: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Date
    }
})

module.exports = mongoose.model('Data', userSchema)