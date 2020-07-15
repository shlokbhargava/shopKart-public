const mongoose = require('mongoose');

// const multer = require('multer');
// const path = require('path');
// const PRODUCT_IMG_PATH = path.join('/uploads/sellers/prdoucts/images');

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    product_name: {
        type: String, 
        required: true
    },
    product_category: {
        type: String,
        required: true
    },
    product_ID: {
        type: Number,
        required: true,
        unique: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_description: {
        type: String
    },
    product_image: {
        type: String
    }

}, {
    timestamps: true
});


// Disk Storage - Product Images
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, '..', PRODUCT_IMG_PATH));
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now());
//     }
// });

// // static methods
// productSchema.statics.uploadedProductImg = multer({ storage: storage }).single('product_image');
// productSchema.statics.productImgPath = PRODUCT_IMG_PATH;


const Product = mongoose.model('Product', productSchema);
module.exports = Product;
