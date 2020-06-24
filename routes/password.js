const express = require('express');
const router = express.Router();
const passport = require('passport');

const passwordController = require('../controllers/password_controller');

// forgot password
router.post('/forgot', passwordController.forgotPassword);
router.get('/create-page/:id', passwordController.createPassPage);
router.post('/create-new', passwordController.createNewPassword);

// reset password
router.post('/reset-link', passport.checkAuthentication, passwordController.resetRequest);

module.exports = router;