import axios from "@nuxtjs/axios"
export const state = () => ({
  showpage: false,
  authUser: false,
  counter: 0,
  userid: null,
  content: "",
  title: "",
  lei: "",
  list: "",
  atid: "",
  date: "",
  ishas: false
});
var marked = require("marked");
export const mutations = {
  SET_USER(state, user) {
    state.authUser = user;
  },
  newatc(state) {
    (state.content = ""), (state.title = ""), (state.lei = "");
    state.ishas = false;
  },

  setUserId(state, id) {
    state.userid = id;
  },
  updatelist(state, data) {
    state.list = data;
  },
  updatectt(state, value) {
    state.content = value;
  },
  updatettl(state, value) {
    state.title = value;
  },
  updatelei(state, value) {
    state.lei = value;
  },
  changearticle(state, data) {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return require("highlight.js").highlightAuto(code).value;
      }
    });

    console.log(data.istrue);
    if (!data.istrue) {
      state.content = marked(data.content);
    } else {
      state.content = data.content;
    }

    state.title = data.title;
    state.lei = data.lei.name;
    state.ishas = true;
    state.atid = data._id;
    state.date = data.createdAt.split("T")[0];
    state.showpage = true
  }
};

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.userid) {
      commit("SET_USER", req.session.userid);
    }
  },
  async getarticle({ commit }, { id }) {

    try {
      let res = await this.$axios
        .post("/getarticle", {
          id: id
        })
      commit("changearticle", res.data.data);

    }
    catch (e) {
      // console.log(e)
    }

    // this.showpage = true;


  }

  //  async login({ commit }, { email, passwd }) {
  //    try {
  //      const { data } = await axios.$post('/login', { email, passwd })
  //      commit('SET_USER', data)
  //       this.$router.push("/admin");
  //    } catch (error) {
  //      if (error.response && error.response.status === 401) {
  //        throw new Error('Bad credentials')
  //      }
  //      throw error
  //    }
  //  },
};
