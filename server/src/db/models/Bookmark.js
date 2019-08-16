const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema({
  name: String,
  url: String,
  username: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
