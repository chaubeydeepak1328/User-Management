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
        minlength: [10, 'Phone Number must be 10 digits'],
        maxlength: [10, 'Phone Number must be 10 digits'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
