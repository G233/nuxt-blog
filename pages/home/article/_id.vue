<template>
  <div>
    <div v-show="!articleData.title" class="loding">
      <Spin size="large"></Spin>
    </div>
    <div v-show="articleData.title">
      <Row class-name="title" type="flex" justify="center" align="middle">
        <Col>
          <h2>{{ articleData.title }}</h2>
        </Col>
      </Row>
      <Row class-name="dateclass" type="flex" justify="center" align="middle">
        <Col>
          <h6>发表于：{{ date }}</h6>
        </Col>
        <Col>
          <Button
            v-if="authUser"
            style="margin-left:50px"
            type="primary"
            @click="changeArticle"
          >
            修改
          </Button></Col
        >
      </Row>
      <Row>
        <Col>
          <div class="article">
            <div
              v-lazy-container="{
                selector: 'img'
              }"
              class="markdown-body"
              v-html="articleData.aftercontent"
            ></div>
          </div>
        </Col>
      </Row>
    </div>
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
      yinying: false,
      articleData: {
        createdAt: "" // 避免 split 报错
      }
    };
  },
  computed: {
    authUser() {
      return this.$store.state.authUser;
    },
    prop() {
      let data = {};
      return data;
    },
    date() {
      return this.articleData.createdAt.split("T")[0];
    }
  },
  beforeMount() {
    // 预加载 recent 数据
    const recentArticle = this.$store.state.recentArticle;
    if (!recentArticle) {
      let res = this.$axios.post("/v2/Recent").then(res => {
        this.$store.commit("SET_RECENT", res.data.data);
      });
    }
  },
  async fetch() {
    try {
      let res = await this.$axios.post("/v2/getArticle", {
        id: this.$route.params.id
      });
      this.articleData = res.data.data;
    } catch (e) {
      console.error(e);
    }
  },
  // 还有问题

  methods: {
    changeArticle() {
      this.$store.commit("setChangeArticleId", this.articleData._id);
      this.$router.push("/admin");
    }
  }
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
.loding {
  display: flex;
  justify-content: center;
}
</style>
