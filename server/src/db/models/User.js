const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
