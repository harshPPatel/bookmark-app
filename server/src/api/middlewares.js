const jwt = require('jsonwebtoken');

// Checking token in authorization header and validating it
function checkValidToken(req, res, next) {
  // Checking if token exists
  if (!req.headers.authorization) {
    res.status(400).json({
      message: 'Bad Request',
    });
  } else {
    // Getting token from header
    const token = req.headers.authorization.split(' ')[1];
    try {
      // Decoding header
      const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);
      // Adding username to request
      req.username = decoded.username;
      // Calling next method
      next();
    } catch (err) {
      res.status(400).json({
        message: 'Bad Request',
      });
    }
  }
}

module.exports = {
  checkValidToken,
};
