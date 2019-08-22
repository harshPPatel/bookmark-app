const bcrypt = require('bcrypt');
const User = require('../db/models/User');
const validateUser = require('./validatation');
const getToken = require('./authToken');

module.exports = (req, res) => {
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

        // Saving user to database
        user.save()
          .then((response) => {
            // Generating auth token
            const authToken = getToken(response.username);

            // Sending response
            res.json({
              username: response.username,
              authToken,
            });
          })
          .catch((err) => {
            // Checking for error code 11000 - Duplicate entry to database
            if (err.code === 11000) {
              res.status(409).json({
                error: 409,
                message: ['Username already exists'],
              });
            } else {
              res.status(500).json({
                error: 500,
                message: ['Error while saving data to the Database'],
              });
            }
          });
      });
  } else {
    res.status(422);
    res.json({
      error: 422,
      message: result.error,
    });
  }
};
