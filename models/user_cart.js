const mongoose = require('mongoose');


const userCartSchema = new mongoose.Schema({
    
});


const Cart = mongoose.model('Cart', userCartSchema);
module.exports = Cart;