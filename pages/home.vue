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
          :key="index1"
          @click="tolist"
          :id="item._id"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="card">
      <div v-for="(item, index) in list" :key="index">
        <LgCard :data="item"></LgCard>
      </div>
    </div>
    <Foote></Foote>
  </div>
</template>

<script>
import Foote from "../components/front/foote";
import Head from "../components/front/head";
import LgCard from "../components/lgcard";
export default {
  components: {
    Head,
    Foote,
    LgCard
  },
  async asyncData({ $axios, app }) {
    try {
      let res1, res2;
      let a;
      if (process.server) {
        [res1, res2] = await Promise.all([
          $axios.post("api/getlist"),
          $axios.post("api/recent")
        ]);
      } else {
        [res1, res2] = await Promise.all([
          $axios.post("/getlist"),
          $axios.post("/recent")
        ]);
      }

      app.store.commit("updatelist", res1.data.data);
      return {
        list: res2.data.data
      };
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    classify() {
      return this.$store.state.list;
    }
  },

  data() {
    return {
      ishome: true
    };
  },
  methods: {
    tolist(e) {
      this.$router.push({
        name: "index-list-id",
        params: { id: e.target.id, name: e.target.textContent }
      });
    },
    toact(e) {
      console, log("开始跳转");
      this.$router.push({
        name: "index-article-name",
        params: {
          name: e.path[0].id
        }
      });
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
  max-width: 15rem;
  margin-bottom: 0.3rem;
  .lei-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .lei-text {
      cursor: pointer;
      color: $sub-color;
      margin-left: 0.3rem;
      font-size: 15px;
    }
    .lei-text:hover {
      color: $title-color;
    }
    .lei-text:first-child {
      margin-left: unset;
    }
  }
}

.card {
  width: 95vw;
  margin: auto;
  max-width: 15rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  padding-top: 0.2rem;
  box-shadow: 8px 28px 50px rgba(39, 44, 49, 0.07),
    1px 6px 12px rgba(39, 44, 49, 0.04);
}
.top-text {
  text-align: center;
  margin: 30px;
  margin-top: 2rem;
  h1 {
    color: $title-color;
  }
  h3 {
    margin-top: 20px;
    color: $sub-color;
  }
}
</style>
