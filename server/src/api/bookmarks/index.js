const express = require('express');
const Bookmark = require('../../db/models/Bookmark');
const addBookmark = require('./add');

const router = express.Router();

router.get('/all', async (req, res) => {
  const bookmarks = await Bookmark
    .find({ username: req.username })
    .sort({ created_at: -1 })
    .exec();
  res.json({
    bookmarks,
    total: bookmarks.length,
    username: req.username,
  });
});

router.get('/add', addBookmark);

module.exports = router;
