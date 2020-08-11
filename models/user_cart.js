const mongoose = require('mongoose');


const userCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
}, {
    timestamps: true
});


const Cart = mongoose.model('Cart', userCartSchema);
module.exports = Cart;