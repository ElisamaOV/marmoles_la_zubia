var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');

router.get('/', indexController.showHome);
router.get('/about-us', indexController.showAbout);
router.get('/contact', indexController.showContact);
router.get('/gifts', indexController.showGifts);

module.exports = router;
