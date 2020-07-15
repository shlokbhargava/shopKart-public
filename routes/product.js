const express = require('express');
const router = express.Router();
const passport = require('passport');

const productsController = require('../controllers/products_controller');

router.post('/new/:id', passport.checkAuthentication, productsController.newProduct);
router.get('/product-page/:id', productsController.productPage);

module.exports = router;