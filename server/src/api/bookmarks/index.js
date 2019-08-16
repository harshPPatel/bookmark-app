const express = require('express');
const Bookmark = require('../../db/models/Bookmark');
const addBookmark = require('./add');
const deleteBookmark = require('./delete');

const router = express.Router();

// All Bookmarks
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

// Add Bookmark
router.post('/add', addBookmark);

router.delete('/:id', deleteBookmark);

module.exports = router;
