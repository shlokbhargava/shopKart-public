const express = require('express');
const router = express.Router();

const passport = require('passport');

const User = require('../models/user');

const usersController = require('../controllers/users_controller');


// create account or sign up
router.post('/create-account', usersController.create);


// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'customer-login', 
    { failureRedirect: 'back',
    failureFlash: true }
), usersController.createSession);


// logout
router.get('/logout', usersController.destroySession);

// Profile page
router.get('/profile/:id', passport.checkAuthentication, usersController.userProfile);

// Update Profile
router.post('/update/:id', passport.checkAuthentication, usersController.updateUser);

// Users cart
router.get('/cart/:id', passport.checkAuthentication, usersController.userCart);

// Add to Cart
router.get('/cart/add/:id', passport.checkAuthentication, usersController.addToCart);

// Delete from cart
router.get('/cart/delete/:id', passport.checkAuthentication, usersController.deleteFromCart);

// Checkout cart
router.get('/checkout/:id', passport.checkAuthentication, usersController.checkOut);

// Order Placed Page
router.get('/order-confirm/:id', passport.checkAuthentication, usersController.orderPlaced);

// Delete User
router.get('/delete/:id', passport.checkAuthentication, usersController.delete);

// For Password reset requests
router.use('/password', require('./password'));

// For handling user address
router.use('/address', require('./address'));



module.exports = router;