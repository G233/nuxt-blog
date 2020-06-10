<template>
  <div>
    <div class="top-text">
      <h1>AtomG 的技术博客</h1>
      <h3>记录学习与生活</h3>
    </div>
    <div class="index-list">
      <div class="lei-list">
        <div
          class="lei-text"
          v-for="(item, index1) in classify"
          :key="item.id"
          @click="tolist(item)"
          :id="item.id"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="card">
      <div v-for="(item, index) in recentArticle" :key="index">
        <LgCard :data="item"></LgCard>
      </div>
    </div>
    <Foote></Foote>
  </div>
</template>
<script>
import Foote from "../components/front/foote";
import Head from "../components/front/head";
import LgCard from "../components/article-card";

export default {
  components: {
    Head,
    Foote,
    LgCard
  },
  async fetch() {
    const recentArticle = this.$store.state.recentArticle;
    // 把 recent 数据缓存下来，避免从文章返回的时候重复加载
    if (!recentArticle) {
      let res = await this.$axios.post("/v2/Recent");
      this.$store.commit("SET_RECENT", res.data.data);
      this.recentArticle = res.data.data;
    } else {
      this.recentArticle = recentArticle;
    }
  },
  async mounted() {},
  computed: {
    classify() {
      return this.$store.state.list;
    }
  },

  data() {
    return {
      ishome: true,
      recentArticle: false
    };
  },
  methods: {
    tolist(item) {
      if (item.openURL) {
        window.open(item.url);
      } else {
        this.$router.push(item.url);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.index-list {
  line-height: 60px;
  height: 60px;
  width: 95vw;
  margin: auto;
  max-width: 900px;
  margin-bottom: 18px;
  .lei-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .lei-text {
      cursor: pointer;
      color: $sub-color;
      margin-left: 18px;
      font-size: 15px;
    }
    .lei-text:hover {
      color: $title-color;
    }
    .lei-text:first-child {
      margin-left: unset;
    }
  }
  @media screen and (max-width: 840px) {
    .lei-list {
      justify-content: center;
    }
  }
}

.card {
  overflow: hidden;
  width: 95vw;
  margin: auto;
  max-width: 900px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 12px;
  box-shadow: 8px 28px 50px rgba(39, 44, 49, 0.07),
    1px 6px 12px rgba(39, 44, 49, 0.04);
}
.top-text {
  text-align: center;
  margin: 30px;
  margin-top: 120px;
  h1 {
    color: $title-color;
  }
  h3 {
    margin-top: 20px;
    color: $sub-color;
  }
}
</style>
