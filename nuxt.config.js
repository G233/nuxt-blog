module.exports = {
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
  css: ["view-design/dist/styles/iview.css", "assets/main.css"],

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
    { src: "@/plugins/vue-mavon-editor", srr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/style-resources"],
  styleResources: {
    scss: "./assets/index.scss"
  },
  axios: {
    browserBaseURL: "/api"
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
