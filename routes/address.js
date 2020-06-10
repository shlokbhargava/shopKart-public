const express = require('express');
const router = express.Router();

const passport = require('passport');

const addressController = require('../controllers/address_controller');

router.post('/new', passport.checkAuthentication, addressController.newAddress);
router.get('/edit/:id', passport.checkAuthentication, addressController.editAddress);
router.post('/edit-save/:id', passport.checkAuthentication, addressController.saveAddress);
router.post('/delete/:id', passport.checkAuthentication, addressController.deleteAddress);


module.exports = router;