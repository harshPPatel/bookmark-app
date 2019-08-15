const express = require('express');
const signup = require('./signup');
const login = require('./login');

const router = express.Router();

router.use('/signup', signup);
router.use('/login', login);

module.exports = router;
