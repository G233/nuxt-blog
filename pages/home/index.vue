<template>
  <div>
    <h1 class="title">最近文章</h1>
  </div>
</template>

<script>
import LgCard from "../../components/lgcard";
export default {
  async asyncData({ $axios }) {
    if (process.server) {
      try {
        let { data } = await $axios.post("/api/recent");
        return { list: data.data };
      } catch (e) {}
    }
  },
  components: {
    LgCard
  },
  data() {
    return {
      list: ""
    };
  },
  methods: {
    toact(e) {
      this.$router.push({
        name: "home-article-name",
        params: { name: e.path[0].id }
      });
    }
  },
  onLoad() {}
};
</script>

<style scoped>
.time {
  font-size: 18px;
  font-weight: bold;
  text-align: right;
}
.title {
  padding-bottom: 2rem;
  color: #fff;
  text-align: center;
}
.recent-page {
  background-color: aquamarine;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.card {
  width: 95%;
  margin: auto;
  max-width: 600px;
}
@media screen and (max-width: 840px) {
  .title {
    color: #17233d;
  }
}
</style>
