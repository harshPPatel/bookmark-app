const express = require('express');
const Bookmark = require('../../db/models/Bookmark');

const router = express.Router();

router.get('/all', async (req, res) => {
  const bookmarks = await Bookmark.find({ username: req.username }).exec();
  res.json({
    bookmarks,
    total: bookmarks.length,
    username: req.username,
  });
});

module.exports = router;
