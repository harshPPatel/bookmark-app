const jwt = require('jsonwebtoken');

const getToken = (username) => jwt.sign({ username }, process.env.AUTH_SECRET_KEY);

module.exports = getToken;
