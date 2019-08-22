const User = require('../db/models/User');
const Bookmark = require('../db/models/Bookmark');

/* eslint-disable consistent-return */
module.exports = async (req, res) => {
  const { username } = req;

  // Finding bookmark
  let user;
  try {
    user = await User.find({ username }).exec();
  } catch (err) {
    return res.status(500).json({
      error: 500,
      message: 'Error while saving data to the Database',
    });
  }

  // Checking if any user found
  if (user.length === 0) {
    return res.status(400).json({
      error: 400,
      message: 'User not found',
    });
  }

  // Removing user
  await User.remove({ username }, (err) => {
    if (err) {
      // Sending error response
      res.status(500).json({
        error: 500,
        message: 'Error while deleting user',
      });
    } else {
      res.status(200).json({
        message: 'User deleted successfully',
      });
    }
  });

  // Deleting all bookmarks of the user
  try {
    await Bookmark.find({ username }).remove().exec();
  } catch (err) {
    res.status(500).json({
      error: 500,
      message: 'Error while deleting your bookmarks',
    });
  }
};
