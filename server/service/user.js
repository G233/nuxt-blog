const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const ArticleModel = mongoose.model("Article");
const LeiModel = mongoose.model("Lei");
const LabelModel = mongoose.model("Label");
const jwt = require("jsonwebToken");
const md = require("md5-node");
class UserServise {
  static async getToken(user) {
    const userid = user._id;
    const token = jwt.sign(
      {
        _id: userid
      },
      "lxg"
    );
    return token;
  }
  static async hasuser(passwd, email) {
    const hasuser = await UserModel.findOne({
      email: email,
      passwd: md(passwd)
    });
    let data;
    if (hasuser) {
      data = {
        flag: true,
        data: hasuser
      };
    } else {
      data = {
        flag: false,
        msg: "账号或密码错误"
      };
    }
    return data;
  }
}
module.exports = UserServise;
