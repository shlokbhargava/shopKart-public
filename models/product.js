const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({

}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;