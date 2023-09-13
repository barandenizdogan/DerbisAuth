const express = require('express');
const {register, login, showUsers, findUser, updateUser, deleteUser, addDerbisPassword, adminregister, adminlogin, deleteAdmin, addToken} = require('../controllers/auth.js');

const router = express.Router();

router.post('/register/:musteri_no', register)
router.post('/adminregister', adminregister)
router.get('/login/:password', login)
router.get('/adminlogin/:adminpassword', adminlogin)
router.delete('/deleteAdmin/:musteri_no', deleteAdmin)
router.get('/users/:musteri_no', showUsers)
router.get('/users/:musteri_no/:username', findUser)
router.patch('/update/:musteri_no/:username', updateUser)
router.delete('/delete/:musteri_no/:username', deleteUser)
router.patch('/addDerbis/:musteri_no/:username', addDerbisPassword)
router.patch('/addToken/:musteri_no', addToken)


module.exports = router;