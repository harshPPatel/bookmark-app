const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../db/models/User');
const validateUser = require('./validatation');
const getToken = require('./authToken');

const router = express.Router();

router.post('/', async (req, res) => {
  // Validating requested data
  const result = validateUser(req.body);

  // Checking if any errors found
  if (result.error.length === 0) {
    // Finding user in database
    const user = await User.findOne({ username: req.body.username }).exec();

    // Checking if no result found
    if (!user) {
      return res.status(404).json({
        error: 404,
        message: 'Invalid Username',
      });
    }

    // Comparing password to the database password
    const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        error: 400,
        message: 'Invalid password',
      });
    }

    // Generating auth token
    const authToken = getToken(user.username);

    // Sending response
    return res.json({
      username: user.username,
      authToken,
    });
  }

  // Sending response on invalid input
  res.status(422);
  return res.json({
    message: result.error,
  });
});

module.exports = router;
