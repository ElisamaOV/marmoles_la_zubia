const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

router.get('/catalogServices', productsController.showCatalogServices);
router.get('/catalogProducts', productsController.showCatalogProducts);
router.get('/miscellaneous', productsController.showCatalogMiscellaneous);

module.exports = router;
