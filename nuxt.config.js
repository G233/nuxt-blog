import axios from "axios";
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
        href:
          "data:image/x-icon;base64,AAABAAEAQEAAAAEAIAAoQgAAFgAAACgAAABAAAAAgAAAAAEAIAAAAAAAAEAAABILAAASCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO6ieADsoXcA7J50AP+AQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////////////////////////////////////////////////////5/////////+B/////////wD/////////AH////////4AP////////Bg////////8Ph//////8Px+H//////gPH8f/////+A4/x//////wBj/mAH///8AAP+AAP///wAAPAAAf//+AAAAAAB///8AAAAB+H///iAwAA/wf//+MHIAR8B///4f8AAHwH///x/gAAeAP///D8AAA8A///8HgAAAwD///4MAAAAAP///wAAAIAA////AAAAgAD///+AgACQAf///8CAAJAD///5gAAAgA////kAAACAB///+AgAAIGD///4HgAAB4P///w/AAAPwf///D+AAB/h///8f4AAH/H///z/yAEf8f//+P/AAB/x///4PAAAAIH///wAACAAAf///AAA+AAB///+AAT+AAP///8AIH4wD//////AfH///////8B8f///////wHh////////AcP+f/////8Bg/x//////wAH////////gAf////////AD/////////gf///////////////////////////////////////////////////////////////////////////////////////////////////8="
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
    browserBaseURL: "https://www.liuxiaogu.com/api"
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
