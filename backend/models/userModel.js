const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone Number is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
