const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  created_at: Date,
});

export default userSchema;
