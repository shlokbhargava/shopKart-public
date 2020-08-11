const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'
        }
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        }
    ],
    order: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserOrder'
        }
    ]

}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;