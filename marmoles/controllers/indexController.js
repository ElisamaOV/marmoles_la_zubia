const connection = require('../config/db');

class IndexController {
  showHome = (req, res) => {
    res.send('Hola');
  };
}

module.exports = new IndexController();
