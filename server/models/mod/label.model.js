const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabelSchema = new Schema({
    name: String,
    Articles: [{
        type: [Schema.Types.ObjectId],
        ref: 'Article', //这里要写你指向的数据库表名字,
    }]
});

module.exports = mongoose.model('Label', LabelSchema);