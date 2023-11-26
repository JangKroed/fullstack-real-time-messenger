const express = require('express');
const validateForm = require('../controllers/validateForm');
const router = express.Router();
const {
    handleLogin,
    attempLogin,
    attempRegister,
} = require('../controllers/authContoller');
const { rateLimiter } = require('../controllers/ratelimiter');

router
    .route('/login')
    .get(handleLogin)
    .post(validateForm, rateLimiter(60, 10), attempLogin);

router.post('/signup', validateForm, rateLimiter(30, 4), attempRegister);

module.exports = router;
