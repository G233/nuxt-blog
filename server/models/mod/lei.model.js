const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeiSchema = new Schema({
  name: String,
  userid: String,
  list: [String],
  lists: {
    type: [Schema.Types.ObjectId],
    ref: 'Article', //这里要写你指向的数据库表名字,
  }
});

module.exports = mongoose.model('Lei', LeiSchema);