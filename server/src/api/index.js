const express = require('express');
const bookmarks = require('./bookmarks');

const middlewares = require('./middlewares');

const router = express.Router();

router.use('/bookmarks', middlewares.checkValidToken, bookmarks);

module.exports = router;
