const express = require('express');
const signup = require('./signup');
const login = require('./login');
const deleteUser = require('./delete');
const { checkValidToken } = require('./middlewares');

const router = express.Router();

// Signup
router.post('/signup', signup);

// Login
router.post('/login', login);

// Delete
router.delete('/delete', checkValidToken, deleteUser);

// Verify
router.post('/verify', checkValidToken, (req, res) => {
  res.status(200).json({
    isUserValid: true,
  });
});

module.exports = router;
