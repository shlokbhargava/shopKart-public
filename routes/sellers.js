const express = require('express');
const router = express.Router();
const passport = require('passport');


const sellerController = require('../controllers/seller_controller');

router.get('/login', sellerController.login);
router.post('/create-account', sellerController.create);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'seller-login', 
    { failureRedirect: 'back',
    failureFlash: true }
), sellerController.createSession);
router.get('/home', passport.checkAuthentication, sellerController.home);

// update
router.post('/update/:id', passport.checkAuthentication, sellerController.updateSeller);

// logout
router.get('/logout', sellerController.destroySession);


module.exports = router;