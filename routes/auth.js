const express = require('express');
const {register, login, showUsers, findUser, updateUser, deleteUser} = require('../controllers/auth.js');

const router = express.Router();

// post update get delete
router.post('/register', register)
router.post('/login', login)
router.get('/users', showUsers)
router.get('/users/:username', findUser)
router.patch('/update/:username', updateUser)
router.delete('/delete/:username', deleteUser)

module.exports = router;