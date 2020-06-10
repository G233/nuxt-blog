export const state = () => ({
  authUser: false,
  recentArticle: false,
  ChangeArticleId: false,
  list: [
    { name: "主页", id: 1, url: "/", openURL: false },
    { name: "标签", id: 2, url: "/home/Labels", openURL: false },
    {
      name: "Github",
      id: 3,
      url: "https://github.com/G233",
      openURL: true
    },
    { name: "简历", id: 5, url: "/label", openURL: false }
  ]
});

export const mutations = {
  setChangeArticleId(state, data) {
    state.ChangeArticleId = data;
  },
  SET_RECENT(state, data) {
    state.recentArticle = data;
  },
  SET_USER(state, userid) {
    state.authUser = userid;
  }
};

export const actions = {
  //nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    // if (localStorage.getItem("token")) {
    //   commit("SET_USER", req.session.userid);
    // }
  }
};
