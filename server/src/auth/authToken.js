const jwt = require('jsonwebtoken');

const getToken = (username) => jwt.sign({ username }, `${process.env.AUTH_SECRET_KEY}`, { expiresIn: '4h' });

module.exports = getToken;
