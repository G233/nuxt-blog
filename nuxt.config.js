// import axios from "axios";
module.exports = {
  generate: {
    async routes(callback) {
      let res = await axios.post("https://www.liuxiaogu.com/api/getlei");
      const routes1 = res.data.data.map(lei => {
        return "/home/list/" + lei._id;
      });
      let res2 = await axios.post("https://www.liuxiaogu.com/api/getallartc");
      const routes2 = res2.data.data.map(artc => {
        return "/home/article/" + artc._id;
      });
      const routes = [...routes1, ...routes2];
      callback(null, routes);
    }
  },
  server: {
    port: 3002
    // host: "192.168.0.120"
  },
  // other configs
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
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
        href: "./static/favicon.ico"
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

  postcss: [
    require("postcss-px2rem")({
      remUnit: 75
    })
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/iview",
    { src: "@/plugins/vue-mavon-editor", srr: false },
    { src: "~/plugins/vue-lazyload.js", ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/style-resources"],
  styleResources: {
    scss: "./assets/index.scss"
  },
  axios: {
    browserBaseURL: "https://119.29.177.240/api"
    // proxyHeaders: false
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
