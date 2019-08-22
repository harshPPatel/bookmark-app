const jwt = require('jsonwebtoken');

const getToken = (username) => {
  const options = {
    expiresIn: '4h',
  };
  return jwt.sign({ username }, `${process.env.AUTH_SECRET_KEY}`, options);
};

module.exports = getToken;
