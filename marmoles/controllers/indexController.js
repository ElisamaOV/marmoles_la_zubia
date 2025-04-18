const connection = require('../config/db');

class IndexController {
  showHome = (req, res) => {
    res.render('index');
  };

  showAbout = (req, res) => {
    res.render('about');
  };

  showContact = (req, res) => {
    res.render('contact');
  };

  showGifts = (req, res) => {
    const sql = 'select * from products where id_category = 7';
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('gifts', { result });
      }
    });
  };
}

module.exports = new IndexController();
