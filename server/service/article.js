const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const ArticleModel = mongoose.model("Article");
const LeiModel = mongoose.model("Lei");
const LabelModel = mongoose.model("Label");
class ArticleService {
  static async addArticle(data) {
    let { lei, content, title, userid, abstract } = data;
    if (abstract.length < 10) {
      abstract = content.replace(/#/g, "").replace(/\*/g, "");
    }
    let hasA = await ArticleModel.findOne({ author: userid, title: title });
    if (hasA) {
      return ctx.error({ msg: "标题重复" });
    }
    let alei = await LeiModel.findOne({ name: lei });
    let aa = await ArticleModel.create({
      lei: alei._id,
      content: content,
      title: title,
      author: userid,
      abstract: abstract
    });
    console.log(aa);
    Article.refuselist(userid);
    return ctx.success({ msg: "文章新建成功" });
  }
  static async addLabel(name) {
    if (await this.hasLabel(name)) {
      return {
        msg: "这个标签已经有啦",
        flag: false
      };
    } else {
      try {
        await LabelModel.create({
          name: name
        });

        return {
          msg: "添加成功啦",
          flag: true
        };
      } catch (e) {
        console.log(e);
        return {
          msg: "添加失败",
          flag: false
        };
      }
    }
  }
  static async getAllLabel() {
    try {
      let labels = await LabelModel.find();
      return labels.reverse();
    } catch (e) {
      console.log(e);
    }
  }
  static async hasLabel(name) {
    try {
      let label = await LabelModel.findOne({ name: name });
      if (label === null) {
        return false;
      } else {
        return true;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = ArticleService;
