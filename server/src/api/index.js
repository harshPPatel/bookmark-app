const express = require('express');
const bookmarks = require('./bookmarks');

const middlewares = require('./middlewares');

const router = express.Router();

// Bookmarks end point
router.use('/bookmarks', middlewares.checkValidToken, bookmarks);

module.exports = router;
