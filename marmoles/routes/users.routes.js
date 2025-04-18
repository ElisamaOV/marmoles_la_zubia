const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', userController.showLogin);
router.post('/login', userController.login);
router.get('/admin', userController.adminView);
router.post('/admin/createUser', userController.createUser);
router.post('/admin/deleteUser', userController.deleteUser);
router.get('/editor', userController.editorView);

module.exports = router;
