const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", //这里要写你指向的数据库表名字,
      autopopulate: true
    },
    lei: {
      type: Schema.Types.ObjectId,
      ref: "Lei", //这里要写你指向的数据库表名字,
      autopopulate: true
    },
    content: String,
    title: String,
    abstract: String
  },
  { timestamps: true }
);

ArticleSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Article", ArticleSchema);
