//文章管理相关接口逻辑层
const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const ArticleModel = mongoose.model("Article");
const LeiModel = mongoose.model("Lei");
const ArticleService = require("../../service/article");
let recent = "";
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

  static async getallartc(ctx) {
    let article = await ArticleModel.find({});
    return ctx.success({ msg: "获取所有文章成功", data: article });
  }

  static async newarticle(ctx) {
    let { lei, content, title, userid, abstract } = ctx.request.body;
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

    Article.refuselist(userid);
    return ctx.success({ msg: "文章新建成功" });
  }
  static async updatearticle(ctx) {
    let { lei, content, title, userid, atid, abstract } = ctx.request.body;
    let alei = await LeiModel.findOne({ name: lei });
    try {
      if (abstract == null) {
        abstract = content.replace(/#/g, "").replace(/\*/g, "");
      }
    } catch (e) {}
    try {
      if (abstract.length < 50) {
        abstract = content.replace(/#/g, "").replace(/\*/g, "");
      }
    } catch (e) {}

    await ArticleModel.findOneAndUpdate(
      { _id: atid },
      { lei: alei._id, content: content, title: title, abstract: abstract }
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
    } catch (e) {}
    return ctx.success({ data: List });
  }
  static async refuselist() {
    let leis = await LeiModel.find();
    for (let x of leis) {
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
    let listname = await LeiModel.findById(id);
    let list = await ArticleModel.find({ lei: id }).sort({ createdAt: -1 });
    return ctx.success({ data: list, msg: listname.name });
  }

  static async addArticle(ctx) {
    let articleData = ctx.request.body;
    if (await ArticleService.hasArticle(articleData.title)) {
      return ctx.error({ msg: "文章标题重复啦" });
    }
    // 将标签名转换为 ID
    articleData.labels = await ArticleService.afterLaber(articleData.labels);
    // 添加摘要
    articleData.abstract = await ArticleService.updateAbstract(
      articleData.content
    );
    // Markdown 转 HTML
    articleData.aftercontent = await ArticleService.MarkdownToHtml(
      articleData.content
    );

    await ArticleService.newArticle(articleData);
    Article.refuseRecent();

    return ctx.success({ msg: "文章发表好了" });
  }
  // 暂未测试
  static async updateArticle(ctx) {
    let articleData = ctx.request.body;
    // 将标签名转换为 ID
    articleData.labels = await ArticleService.afterLaber(articleData.labels);
    // 添加摘要
    articleData.abstract = await ArticleService.updateAbstract(
      articleData.content
    );
    // Markdown 转 HTML
    articleData.aftercontent = await ArticleService.MarkdownToHtml(
      articleData.content
    );

    await ArticleService.updateArticle(articleData);
    Article.refuseRecent();

    return ctx.success({ msg: "文章更新好了" });
  }
  static async addLabel(ctx) {
    let { name } = ctx.request.body;
    let { msg, flag } = await ArticleService.addLabel(name);
    return flag ? ctx.success({ msg: msg }) : ctx.error({ msg: msg });
  }
  static async getAllLabel(ctx) {
    let labels = await ArticleService.getAllLabel();
    return ctx.success({ data: labels });
  }
  static async Recent(ctx) {
    if (recent.length) {
      return ctx.success({ data: recent });
    }
    const recentArticle = await ArticleService.getRecent();
    // 还得写刷新函数
    recent = recentArticle;
    return ctx.success({ data: recentArticle });
  }
  static async refuseRecent() {
    const recentArticle = await ArticleService.getRecent();
    recent = recentArticle;
  }
  static async getArticle(ctx) {
    let { id } = ctx.request.body;
    const article = await ArticleService.getArticle(id);
    delete article.content;
    return ctx.success({ data: article });
  }
  static async getFallArticle(ctx) {
    let { id } = ctx.request.body;
    const article = await ArticleService.getArticle(id);
    let labels = [];
    return ctx.success({ data: article });
  }
  static async getLableArtivle(ctx) {
    let { id } = ctx.request.body;
    const articles = await ArticleService.getLableArtivle(id);
    return ctx.success({ data: articles });
  }
}

module.exports = Article;
