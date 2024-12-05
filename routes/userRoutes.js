const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.registerUser); /*ok*/
router.post('/login', userController.loginUser); /*ok*/
router.get('/', userController.getAllUsers); /*ok*/
router.put('/:id', userController.updateUser); /*ok*/
router.delete('/:id', userController.deleteUser); /*ok*/

module.exports = router;
