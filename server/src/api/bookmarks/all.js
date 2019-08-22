const Bookmark = require('../../db/models/Bookmark');

module.exports = async (req, res) => {
  const bookmarks = await Bookmark
    .find({ username: req.username })
    .sort({ created_at: -1 })
    .exec();
  res.json({
    bookmarks,
    total: bookmarks.length,
    username: req.username,
  });
};
