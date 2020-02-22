class Index {
  static async index(ctx) {
    const { session } = ctx;
    let userid = session.userid;
    return ctx.success({ data: { userid: userid } });
  }
}
module.exports = Index;
