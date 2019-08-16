const Bookmark = require('../../db/models/Bookmark');

/* eslint-disable consistent-return */
module.exports = async (req, res) => {
  const bookmarkId = req.params.id;

  // Finding bookmark
  let bookmark;
  try {
    bookmark = await Bookmark.find({ _id: bookmarkId }).exec();
  } catch (err) {
    return res.status(500).json({
      error: 500,
      message: 'Error while saving data to the Database',
    });
  }

  // Returning response if no bookmark found
  if (bookmark.length === 0) {
    res.status(404).json({
      error: 400,
      message: 'Bookmark not found',
    });
  }

  // Checking if bookmark username and req.username is same or not
  if (bookmark[0].username === req.username) {
    // Removing bookmark
    await Bookmark.remove({ _id: bookmarkId }, (err) => {
      if (err) {
        // Sending error response
        res.status(500).json({
          error: 500,
          message: 'Error while saving data to the Database',
        });
      } else {
        res.status(200).json({
          message: 'Bookmark deleted successfully',
        });
      }
    });
  } else {
    return res.status(400).json({
      error: 400,
      message: 'Unauthorized request',
    });
  }
};
