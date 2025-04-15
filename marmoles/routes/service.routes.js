const express = require('express');
const serviceController = require('../controllers/serviceController');
const router = express.Router();

router.get('/', serviceController.showCatalogServices);
router.get('/service/:id', serviceController.showService);

module.exports = router;
