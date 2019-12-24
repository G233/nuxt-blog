//文章管理相关接口逻辑层
const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const ArticleModel = mongoose.model("Article");
const LeiModel = mongoose.model("Lei");

class Article {
  static async addlei(ctx) {
    let { lei, userid } = ctx.request.body;
    let haslei = await LeiModel.findOne({ name: lei, userid: userid });
    if (haslei) {
      return ctx.error({ msg: "类名重复，要不得" });
    }

    let newlei = await LeiModel.create({ name: lei, userid: userid });
    return ctx.success({ msg: "新类别添加成功" });
  }

  static async getlei(ctx) {
    let leis = await LeiModel.find({});

    return ctx.success({ msg: "获取类别成功", data: leis });
  }
  static async newarticle(ctx) {
    let { lei, content, title, userid } = ctx.request.body;
    let hasA = await ArticleModel.findOne({ author: userid, title: title });
    if (hasA) {
      return ctx.error({ msg: "标题重复" });
    }
    let alei = await LeiModel.findOne({ name: lei });
    let newa = await ArticleModel.create({
      lei: alei._id,
      content: content,
      title: title,
      author: userid
    });
    Article.refuselist(userid);
    return ctx.success({ msg: "文章新建成功" });
  }
  static async updatearticle(ctx) {
    let { lei, content, title, userid, atid } = ctx.request.body;
    let alei = await LeiModel.findOne({ name: lei });
    let At = await ArticleModel.findOneAndUpdate(
      { _id: atid },
      { lei: alei._id, content: content, title: title }
    );
    Article.refuselist(userid);

    return ctx.success({ msg: "文章更改成功" });
  }
  static async getarticle(ctx) {
    let { id } = ctx.request.body;
    let article = await ArticleModel.findById(id);

    return ctx.success({ data: article });
  }
  static async getarticle1(ctx) {
    let { name } = ctx.request.body;
    let article = await ArticleModel.findOne({ title: name });
    return ctx.success({ data: article });
  }

  static async getlist(ctx) {
    let List;
    try {
      List = await LeiModel.find({});
    } catch (e) { }
    return ctx.success({ data: List });
  }
  static async refuselist(userid) {
    console.log("开始刷新列表");

    let leis = await LeiModel.find();
    for (let x of leis) {
      console.log(x);
      let alist = [];
      let ats = await ArticleModel.find({ lei: x._id });
      for (let y of ats) {
        alist.push(y.title);
      }

      let z = await LeiModel.findOneAndUpdate({ _id: x._id }, { list: alist });
    }
  }
  static async recent(ctx) {
    let data = await ArticleModel.find().sort({ createdAt: -1 });
    return ctx.success({ data: data.slice(0, 5) });
  }
  static async addimg(ctx) {
    let paths = [];

    for (let x in Object.keys(ctx.request.files)) {
      paths.push([
        x,
        ctx.request.files[x].path.replace("/www/front/dist/", "/")
      ]);
    }
    return ctx.success({ data: paths });
  }
  static async deleteat(ctx) {
    let { atid, userid } = ctx.request.body;
    await ArticleModel.deleteOne({ _id: atid });
    await Article.refuselist(userid);
    return ctx.success({});
  }
  static async getlists(ctx) {
    let { id } = ctx.request.body;
    let listname = await LeiModel.findById(id)
    let list = await ArticleModel.find({ lei: id });
    return ctx.success({ data: list, msg: listname.name });
  }
}
module.exports = Article;
