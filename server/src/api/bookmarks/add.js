const validateBookmark = require('./validation');
const Bookmark = require('../../db/models/Bookmark');

module.exports = (req, res) => {
  const result = validateBookmark(req.body);

  // Checking if any errors found
  if (result.error.length === 0) {
    // Creating User
    const bookmark = new Bookmark({
      name: req.body.name,
      url: req.body.url,
      username: req.username,
    }, { strict: false });

    // Saving bookmark
    bookmark.save()
      .then(() => {
        res.status(200).json({
          message: 'Bookmark added successfully',
          bookmark,
        });
      })
      .catch(() => {
        res.status(500).json({
          error: 500,
          message: 'Error while saving data to the Database',
        });
      });
  } else {
    res.status(422);
    res.json({
      error: 422,
      message: result.error,
    });
  }
};
