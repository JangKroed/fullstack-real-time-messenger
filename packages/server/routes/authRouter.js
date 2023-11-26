const express = require('express');
const validateForm = require('../controllers/validateForm');
const router = express.Router();
const {
    handleLogin,
    attempLogin,
    attempRegister,
} = require('../controllers/authContoller');

router.route('/login').get(handleLogin).post(validateForm, attempLogin);

router.post('/signup', validateForm, attempRegister);

module.exports = router;
