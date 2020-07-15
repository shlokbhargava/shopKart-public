const Product = require('../models/product');
const Seller = require('../models/seller');

exports.newProduct = async (req, res) => {
    try {
        let seller = await Seller.findById(req.params.id);

        if (seller) {

                let product = await Product.create({
                    user: seller._id,
                    product_name: req.body.product_name,
                    product_category: req.body.product_category,
                    product_ID: req.body.product_ID,
                    product_price: req.body.product_price,
                    product_description: req.body.product_description,
                });

                // this is saving the path of the uploaded file into the product img field in the product
                // product.product_image = Product.productImgPath + '/' + req.file.filenames;
                // product.save();

                seller.product.push(product);
                seller.save();

                req.flash('success', 'New Product Added');
                return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        console.log('the error : ', err);
        return res.redirect('back');
    }
}


// Display Product Page
exports.productPage = async (req, res) => {

    try {
        let product = await Product.findById(req.params.id);

        let seller = await Seller.findById(product.user);

        return res.render('product-page', {
            title: 'Product Details',
            product: product,
            seller: seller
        });

    } catch (errr) {
        req.flash('error', err);
        return res.redirect('back');
    }

}




