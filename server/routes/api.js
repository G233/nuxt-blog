const User = require("../controllers/user/user");
const Article = require("../controllers/article/article");
const Index = require("../controllers/index/index");
const router = require("koa-router")();

router
  //主页
  .post("/api/index", Index.index)
  //用户相关
  .post("/api/mailcode", User.mailcode)
  .post("/api/checkcode", User.checkcode)
  .post("/api/register", User.register)
  .post("/api/login", User.login)

  //文章相关
  .post("/api/addlei", Article.addlei)
  .post("/api/getallartc", Article.getallartc)
  .post("/api/getlei", Article.getlei)
  .post("/api/newarticle", Article.newarticle)
  .post("/api/getlist", Article.getlist)
  .post("/api/getarticle", Article.getarticle)
  .post("/api/getarticle1", Article.getarticle1)
  .post("/api/updatearticle", Article.updatearticle)
  .post("/api/recent", Article.recent)
  .post("/api/addimg", Article.addimg)
  .post("/api/deleteat", Article.deleteat)
  .post("/api/getlists", Article.getlists)
  .post("/api/v2/Login", User.Login)
  .post("/api/v2/addlabel", Article.addLabel)
  .post("/api/v2/getAllLabel", Article.getAllLabel)
  .post("/api/v2/updateArticle", Article.updateArticle)
  .post("/api/v2/Recent", Article.Recent)
  .post("/api/v2/getArticle", Article.getArticle)
  .post("/api/v2/getFallArticle", Article.getFallArticle)
  .post("/api/v2/getLableArtivle", Article.getLableArtivle)
  .post("/api/v2/addArticle", Article.addArticle);

module.exports = router;
