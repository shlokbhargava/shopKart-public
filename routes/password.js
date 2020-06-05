const express = require('express');
const router = express.Router();

const passwordController = require('../controllers/password_controller');

// forgot password
router.post('/forgot', passwordController.forgotPassword);
router.get('/create-page/:id', passwordController.createPassPage);
router.post('/create-new/:id', passwordController.createNewPassword);

router.post('/reset-request', passwordController.resetRequest);

module.exports = router;