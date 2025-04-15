const connection = require('../config/db');

class ServiceController {
  showCatalogServices = (req, res) => {
    let sql = 'select * from service';
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
        res.send('Hola');
      }
    });
  };

  showService = (req, res) => {
    const { id } = req.params;
    let sql = 'select * from service where id_service = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
        res.send(`Hola estamos en servicio ${id}`);
      }
    });
  };
}

module.exports = new ServiceController();
