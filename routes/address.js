const express = require('express');
const router = express.Router();

const passport = require('passport');

const addressController = require('../controllers/address_controller');

router.post('/new', passport.checkAuthentication, addressController.newAddress);
router.post('/delete/:id', passport.checkAuthentication, addressController.deleteAddress);


module.exports = router;