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
}

module.exports = new UserController();
