const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  passwd: {
    type: String,
  },
  email: {
    type: String,
  },
  code: {
    type: Number,
  }


});

module.exports = mongoose.model('User', UserSchema);