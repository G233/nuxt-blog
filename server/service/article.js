const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const ArticleModel = mongoose.model("Article");
const LeiModel = mongoose.model("Lei");
const LabelModel = mongoose.model("Label");
class ArticleService {
  // 储存新文章
  static async saveArticle(data) {
    const { content, title, userid, abstract, labels, aftercontent } = data;
    return await ArticleModel.create({
      labels: labels,
      content: content,
      title: title,
      author: userid,
      abstract: abstract,
      aftercontent: aftercontent
    });
  }
  // 判断文章是否存在
  static async hasArticle(title) {
    const hasA = await ArticleModel.findOne({ title: title });
    return hasA ? true : false;
  }
  // 转换标签
  static async afterLaber(labels) {
    let Labels = [];
    for (let x of labels) {
      let La = await LabelModel.findOne({ name: x });
      Labels.push(La._id);
    }
    return Labels;
  }
  // 更新摘要
  static updateAbstract(data) {
    const abstract = data
      .replace(/#/g, "")
      .replace(/\*/g, "")
      .replace(/\s/g, "")
      .slice(0, 400);
    console.log(abstract);
    return abstract;
  }

  static async MarkdownToHtml(html) {
    let hljs = require("highlight.js");
    let md = require("markdown-it")({
      html: true,
      linkify: true,
      typographer: true,
      highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
        return ""; // 使用额外的默认转义
      }
    });
    // 添加图片懒加载所需字段
    return md.render(html).replace(/src/g, "data-src");
  }
  static async updateArticle(data) {}
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
  static async updateArticle(data) {
    await ArticleModel.findByIdAndUpdate({ _id: data.atid }, { data });
  }
}
module.exports = ArticleService;
