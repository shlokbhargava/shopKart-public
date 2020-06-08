const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
    },
    mNumber: {
        type: Number,
        required: true 
    },
    altNumber: {
        type: Number
    },
    fNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    address2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});


const userAddress = mongoose.model('userAddress', userAddressSchema);
module.exports = userAddress;