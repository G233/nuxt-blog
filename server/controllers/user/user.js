// 货物管理相关接口逻辑层

const mongoose = require('mongoose')
const UserModel = mongoose.model('User')

var md = require('md5-node')
class User {
  // 发送邮箱验证码
  static async mailcode (ctx) {
    console.log(typeof ctx.request.body)
    const email = ctx.request.body.email

    const ishas = await UserModel.findOne({ email: email })
    console.log(ishas)
    if (ishas) {
      return ctx.error({ msg: '此邮箱已被注册', code: 201 })
    } else {
      let code = ''
      for (let i = 0; i < 4; i++) {
        code += Math.floor(Math.random() * 10)
      }
      code = parseInt(code)
      console.log(code)

      const result = await UserModel.create({ email: email, code: code })
      if (!result) {
        return ctx.error({ msg: '验证码发送失败，请稍后重试' })
      }
      return ctx.success({ msg: '验证码发送成功,30秒后可再次发送' })
    }
  }

  // 邮箱验证码校验
  static async checkcode (ctx) {
    const { code, email } = ctx.request.body
    const ishas = await UserModel.findOne({ code: code, email: email })
    if (ishas) {
      return ctx.success({ msg: '验证码正确' })
    } else {
      return ctx.error({ msg: '验证码错误' })
    }
  }

  // 注册
  static async register (ctx) {
    console.log(ctx.request.body)
    const { name, email, passwd } = ctx.request.body
    const newuser = await UserModel.findOne({ email: email }).findOneAndUpdate({
      name: name,
      passwd: md(passwd)
    })
    if (newuser) {
      return ctx.success({ msg: '注册成功' })
    } else {
      return ctx.error({ msg: '注册失败' })
    }
  }

  // 登录
  static async login (ctx) {
    const { passwd, email } = ctx.request.body
    const hasuser = await UserModel.findOne({ email: email, passwd: md(passwd) })

    if (!hasuser) {
      return ctx.error({})
    } else {
      const userid = hasuser._id
      const { session } = ctx
      session.userid = userid
      return ctx.success({ data: { userid: userid } })
    }
  }
}
module.exports = User
