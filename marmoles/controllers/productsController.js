const connection = require('../config/db');

class ProductsController {
  showCatalogProducts = (req, res) => {
    const sql = 'select * from products';
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send('Estoy en productos');
      }
    });
  };

  showProduct = (req, res) => {
    const { id } = req.params;
    let sql = 'select * from products where id_product = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
        res.send(`Estoy en el producto ${id}`);
      }
    });
  };

  showCatalogMiscellaneous = (req, res) => {
    res.send('Estoy en miscelanea');
  };
}
module.exports = new ProductsController();
