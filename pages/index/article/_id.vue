<template>
  <div v-if="showpage">
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
        <Card class="article">
          <div class="markdown-body" v-html="content"></div>
        </Card>
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

  created() {
    this.$store.dispatch("getarticle", { id: this.$route.params.id });
  },
  async asyncData({ store, params }) {
    await store.dispatch("getarticle", { id: params.id });
  },

  methods: {}
};
</script>

<style scoped>
.title {
  padding-top: 35px;
  font-size: 16px;
  color: white;
}

.article {
  width: 95%;
  max-width: 900px;
  margin: auto;
  padding: 10px;
  min-height: 1000px;
}

.dateclass {
  color: white;
  padding: 35px;
  font-size: 20px;
}

.md {
  z-index: 1;
}
@media screen and (max-width: 840px) {
  .title{
    color: #17233d
  }
  .dateclass{
    color: #515a6e
  }
}
</style>