const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

router.get('/', productsController.showCatalogProducts);
router.get('/product/:id', productsController.showProduct);
router.get('/miscellaneous', productsController.showCatalogMiscellaneous);

module.exports = router;
