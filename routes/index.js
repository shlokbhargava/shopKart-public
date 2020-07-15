const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.homePage);
router.use('/users', require('./users'));
router.use('/sellers', require('./sellers'));
router.use('/product', require('./product'));



module.exports = router;