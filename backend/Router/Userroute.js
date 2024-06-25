const { register, login, logout, getOtheruser }  = require( '../Controller/UserController.js')
const express = require('express');

const isauth = require('../Middelware/isAuth');

const router = express.Router();

router.route('/signup').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/').get(isauth,getOtheruser);

module.exports = router;