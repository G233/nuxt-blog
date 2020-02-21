var mongoose = require('mongoose');
const {dbConfigString} = require('../config/dbconfig')
require('../models/index')
mongoose.connect(dbConfigString);
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('数据库连接成功');
});