const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
}, {
    timestamps: true
});

const UserOrder = mongoose.model('UserOrder', orderSchema);
module.exports = UserOrder;