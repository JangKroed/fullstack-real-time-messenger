const express = require('express');
const validateForm = require('../controllers/validateForm');
const router = express.Router();

router.post('/login', validateForm);

router.post('/register', validateForm);

module.exports = router;
