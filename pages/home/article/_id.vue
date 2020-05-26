<template>
  <div>
    <Row class-name="title" type="flex" justify="center" align="middle">
      <Col>
        <h2>{{ title }}</h2>
      </Col>
    </Row>
    <Row class-name="dateclass" type="flex" justify="center" align="middle">
      <Col>
        <h6>发表于：{{ date }}</h6>
      </Col>
    </Row>
    <Row>
      <Col>
        <div class="article">
          <div
            v-lazy-container="{
              selector: 'img'
            }"
            class="markdown-body"
            v-html="content"
          ></div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import "../../../assets/md.css";
import "../../../assets/mdhight.css";
import Loding from "../../../components/Loding";

export default {
  scrollToTop: true,
  components: {
    Loding
  },
  data() {
    return {
      dm: true,
      yinying: false
    };
  },
  computed: {
    showpage() {
      return this.$store.state.showpage;
    },
    prop() {
      let data = {};
      return data;
    },
    date() {
      return this.$store.state.date;
    },
    title() {
      return this.$store.state.title;
    },
    content() {
      return this.$store.state.content;
    },
    date() {
      return this.$store.state.date;
    }
  },

  mounted() {
    // this.$store.dispatch("getarticle", { id: this.$route.params.id });
  },
  async asyncData({ $axios, store, params }) {
    let res;
    if (process.server) {
      res = await $axios.post("api/getarticle", {
        id: params.id
      });
      store.commit("changearticle", res.data.data);
    } else {
      res = await $axios.post("getarticle", {
        id: params.id
      });
      store.commit("changearticle", res.data.data);
    }
  },
  // async fetch() {
  //   try {
  //     let res;
  //     if (process.client) {
  //       res = await this.$axios.post("getarticle", {
  //         id: this.$route.params.id
  //       });
  //     } else {
  //       res = await this.$axios.post("api/getarticle", {
  //         id: this.$route.params.id
  //       });
  //     }

  //     this.$store.commit("changearticle", res.data.data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // },
  // 还有问题

  methods: {}
};
</script>

<style lang="scss" scoped>
.title {
  padding-top: 20px;
  font-size: 16px;
  color: $title-color;
}

.article {
  width: 95%;
  max-width: 900px;
  margin: auto;
  padding: 18px;
  min-height: 1000px;
  padding-bottom: 60px;
}

.dateclass {
  padding: 35px;
  font-size: 20px;
  color: $sub-color;
}

.md {
  z-index: 1;
}
</style>
