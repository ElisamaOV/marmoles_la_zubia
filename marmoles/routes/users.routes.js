const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/admin', userController.adminView);
router.post('/admin/createUser', userController.createUser);
router.post('/admin/deleteUser', userController.deleteUser);

module.exports = router;
