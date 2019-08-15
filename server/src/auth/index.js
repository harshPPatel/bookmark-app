const express = require('express');
const validateUser = require('./validatation');
const bcrypt = require('bcrypt');
const User = require('../db/models/User');

const router = express.Router();

router.get('/', (req, res) => (
  res.json({
    message: 'Inside Auth!',
  })
));

router.post('/signup', (req, res) => {
  // Validating requested data
  const result = validateUser(req.body);

  // Checking if any errors found
  if (result.error.length === 0) {

    // Hashing the password
    bcrypt
      .hash(req.body.password, 8)
      .then((hashedPass) => {
        // Creating User
        const user = new User({
          username: req.body.username,
          password: hashedPass,
        }, { strict: false });
        
        // Create method which returns token and add token to response
        // Saving user to database
        user.save()
          .then(response => {
            res.json({
              username: response.username,
            });
          })
          .catch(err => console.log(err));
      });
  } else {
    res.status(422);
    res.json({
      message: result.error,
    });
  }
});

module.exports = router;
