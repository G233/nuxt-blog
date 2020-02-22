export const state = () => ({
  isfirst: true,
  showpage: false,
  authUser: false,
  counter: 0,
  userid: null,
  content: '',
  title: '',
  lei: '',
  list: '',
  atid: '',
  date: '',
  ishas: false,
  LeiList: '',
  abstract: ''
})

export const mutations = {
  SET_USER (state, user) {
    state.authUser = user
  },
  tohome (state, user) {
    state.isfirst = false
  },
  newatc (state) {
    state.content = ''
    state.title = ''
    state.lei = ''
    state.ishas = false
    state.abstract = ''
  },

  setUserId (state, id) {
    state.userid = id
  },
  updatelist (state, data) {
    state.list = data
  },
  updateabstract (state, data) {
    state.abstract = data
  },
  updatectt (state, value) {
    state.content = value
  },
  updatettl (state, value) {
    state.title = value
  },
  updatelei (state, value) {
    state.lei = value
  },
  ChangeLei (state, value) {
    state.LeiList = state.list[value].list
  },
  changearticle (state, data) {
    if (!data.istrue) {
      var hljs = require('highlight.js')
      var md = require('markdown-it')({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value
            } catch (__) { }
          }
          return ''// 使用额外的默认转义
        }
      })
      state.content = md.render(data.content)
    } else {
      state.content = data.content
    }

    state.title = data.title
    state.abstract = data.abstract
    state.lei = data.lei.name
    state.ishas = true
    state.atid = data._id
    state.date = data.createdAt.split('T')[0]
    state.showpage = true
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.userid) {
      commit('SET_USER', req.session.userid)
    }
  },
  async getarticle ({ commit }, { id }) {
    try {
      const res = await this.$axios.post('/getarticle', {
        id: id
      })
      commit('changearticle', res.data.data)
    } catch (e) { }
  }
}
