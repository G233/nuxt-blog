module.exports = {
  generate: {
    async routes(callback) {
      const axios = require("axios");
      let res = await axios.post("http://localhost:3002/api/getAllLabel");
      const routes1 = res.data.data.map(lei => {
        return "/home/list/" + lei._id;
      });
      let res2 = await axios.post("http://localhost:3002/api/getallartc");
      const routes2 = res2.data.data.map(artc => {
        return "/home/article/" + artc._id;
      });
      const routes = [...routes1, ...routes2];
      callback(null, routes);
    }
  },
  server: {
    port: 3002
    // host: "192.168.0.108"
  },
  // other configs
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: "zh"
    },
    title: process.env.npm_package_name || "",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1,user-scalable=no"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "./favicon.ico"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#19be6b"
  },
  /*
   ** Global CSS
   */
  css: [
    "view-design/dist/styles/iview.css",
    "assets/main.css",
    "assets/flexible.css"
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/axios",
    { src: "@/plugins/iview" },
    { src: "@/plugins/vue-mavon-editor", mode: "client" },
    { src: "~/plugins/vue-lazyload.js", mode: "client" }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/style-resources"],
  styleResources: {
    scss: "./assets/index.scss"
  },
  axios: {
    baseURL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3002/api/v2"
        : "https://www.liuxiaogu.com/v2"
    // baseURL: "http://localhost:3002/api"
    // proxyHeaders: false
    // credentials: true
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/view-design/],
    extractCSS: true, // 提取 CSS
    // analyze: true,
    // cache: true,
    postcss: [
      require("postcss-px2rem")({
        remUnit: 50
      })
    ],
    babel: {
      plugins: [
        [
          "import",
          {
            libraryName: "view-design",
            libraryDirectory: "src/components"
          }
        ]
      ]
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
