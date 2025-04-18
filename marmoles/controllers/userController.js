const connection = require('../config/db');
const bcrypt = require('bcrypt');

class UserController {
  adminView = (req, res) => {
    let sql = 'SELECT * FROM user';
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('admin', {
          message: '',
          confirm: '',
          result,
          confirmDelete: '',
        });
      }
    });
  };

  createUser = (req, res) => {
    const { name, password, repPassword, role } = req.body;
    if (!name || !password || !repPassword || !role) {
      let sql = 'SELECT * FROM user';
      connection.query(sql, (err, result) => {
        if (err) {
          throw err;
        } else {
          res.render('admin', {
            message: 'Falta algun campo',
            confirm: '',
            result,
            confirmDelete: '',
          });
        }
      });
    } else {
      if (password !== repPassword) {
        let sql = 'SELECT * FROM user';
        connection.query(sql, (err, result) => {
          if (err) {
            throw err;
          } else {
            res.render('admin', {
              message: 'Las contraseñas no coinciden',
              confirm: '',
              result,
              confirmDelete: '',
            });
          }
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            throw err;
          } else {
            const sql =
              'INSERT INTO user (name, password, role) VALUES (?, ?, ?)';
            const values = [name, hash, role];
            connection.query(sql, values, (errSQL) => {
              if (errSQL) {
                if (errSQL.errno === 1062) {
                  let sql = 'SELECT * FROM user';
                  connection.query(sql, (err, result) => {
                    if (err) {
                      throw err;
                    } else {
                      res.render('admin', {
                        message: 'Correo ya en uso',
                        confirm: '',
                        result,
                        confirmDelete: '',
                      });
                    }
                  });
                } else {
                  throw errSQL;
                }
              } else {
                let sql = 'SELECT * FROM user';
                connection.query(sql, (err, result) => {
                  if (err) {
                    throw err;
                  } else {
                    res.render('admin', {
                      message: '',
                      confirm: 'Usuario creado correctamente',
                      result,
                      confirmDelete: '',
                    });
                  }
                });
              }
            });
          }
        });
      }
    }
  };

  deleteUser = (req, res) => {
    const { id_user } = req.body;
    const sql = 'DELETE FROM user WHERE id_user = ?';
    connection.query(sql, [id_user], (err) => {
      if (err) {
        throw err;
      } else {
        let sql = 'SELECT * FROM user';
        connection.query(sql, (err, result) => {
          if (err) {
            throw err;
          } else {
            res.render('admin', {
              message: '',
              confirm: '',
              result,
              confirmDelete: 'Usuario eliminado correctamente',
            });
          }
        });
      }
    });
  };

  editorView = (req, res) => {
    res.render('editor');
  };

  showLogin = (req, res) => {
    res.render('login', { advice: '' });
  };

  login = (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
      res.render('login', { advice: 'Falta uno de los campos' });
    } else {
      let sql = 'select * from user where name = ?';
      connection.query(sql, [name], (err, result) => {
        if (err) {
          throw err;
        } else {
          if (result.length == 0) {
            res.render('login', { advice: 'El usuario no existe' });
          } else {
            let hash = result[0].password;
            bcrypt.compare(password, hash, (errHash, resultCompare) => {
              if (errHash) {
                throw errHash;
              } else {
                if (!resultCompare) {
                  res.render('login', { advice: 'Contraseña incorrecta' });
                } else {
                  if (result[0].role == 1) {
                    res.redirect('/user/admin');
                  } else {
                    res.redirect('/user/editor');
                  }
                }
              }
            });
          }
        }
      });
    }
  };
}

module.exports = new UserController();
