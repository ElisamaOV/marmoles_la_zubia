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
}

module.exports = new IndexController();
