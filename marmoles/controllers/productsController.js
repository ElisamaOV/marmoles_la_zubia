const connection = require('../config/db');

class ProductsController {
  showCatalogServices = (req, res) => {
    res.send('Hola estoy en catalogServices');
  };
  showCatalogProducts = (req, res) => {
    res.send('Hola estoy en catalogProducts');
  };
  showCatalogMiscellaneous = (req, res) => {
    res.send('Estoy en miscelanea');
  };
}
module.exports = new ProductsController();
