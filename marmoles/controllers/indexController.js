const connection = require('../config/db');

class IndexController {
  showHome = (req, res) => {
    res.render('index');
  };

  showAbout = (req, res) => {
    res.send('About');
  };
}

module.exports = new IndexController();
