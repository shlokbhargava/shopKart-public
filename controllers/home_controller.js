const Product = require('../models/product');


// rendering shopKart Home Page
module.exports.homePage = async (req,res) => {

    let product = await Product.find({});

    return res.render('home', {
        title: "shopKart | Home",
        product: product
    });     
}