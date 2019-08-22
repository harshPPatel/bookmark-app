const express = require('express');
const allBookmarks = require('./all');
const addBookmark = require('./add');
const deleteBookmark = require('./delete');

const router = express.Router();

// All Bookmarks
router.get('/all', allBookmarks);

// Add Bookmark
router.post('/add', addBookmark);

// Delete Bookmark
router.delete('/:id', deleteBookmark);

module.exports = router;
