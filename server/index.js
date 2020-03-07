const MongooseStore = require("koa-session-mongoose");
const db = require("./models/db");
const api = require("./routes/api");
const mongoose = require("mongoose");
const Koa = require("koa");
const consola = require("consola");
const cors = require("koa2-cors");
const onerror = require("koa-onerror");
const session = require("koa-session");
const logger = require("koa-logger");
const koaBody = require("koa-body");

const app = new Koa();

app.keys = ["liuxiaogu"];

const { Nuxt, Builder } = require("nuxt");

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = !(app.env === "production");

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || "127.0.0.1",
    port = process.env.PORT || 3000
  } = nuxt.options.server;

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  app.use(ctx => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    ctx.req.session = ctx.session;
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    return new Promise((resolve, reject) => {
      ctx.res.on("close", resolve);
      ctx.res.on("finish", resolve);
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject);
      });
    });
  });

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();

onerror(app);

// middlewares

app.use(logger());
app.use(
  cors({
    // origin: ["http://blog.liuxiaogu.com"],
    //origin: ["http://www.liuxiaogu.cn"],
    //origin: ["http://localhost:8080"], // 允许这个域名的 跨域请求
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["POST", "GET"],
    allowHeaders: ["Content-Type", "Authorization", "Accept", "multipart"]
  })
);
app.use(
  session(
    {
      key: "lxg",
      overwrite: true, //覆写Cookie
      httpOnly: true, //不允许通过 JS 来更改
      renew: true, //会话快到期时续订，可以保持用户一直登陆a
      store: new MongooseStore({
        createIndexes: "appSessions",
        connection: mongoose,
        expires: 86400, // 默认一天
        name: "AppSession"
      }) //传入一个用于session的外部储存，我这里是使用了 mongodb
    },
    app
  )
);
app.use(koaBody());

app.use(require("./middlewaers/response"));
//session

// routes
app.use(api.routes(), api.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});
