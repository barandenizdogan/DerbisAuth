const express = require('express');
const {register, login, showUsers, findUser, updateUser, deleteUser} = require('../controllers/auth.js');

const router = express.Router();

router.post('/register', register)
router.get('/login/:password', login)
router.get('/users', showUsers)
router.get('/users/:username', findUser)
router.patch('/update/:username', updateUser)
router.delete('/delete/:username', deleteUser)

module.exports = router;