<template>
  <Row type="flex" justify="center" align="middle">
    <Col>
      <div class="recent">
        <h1 class="title" style>最近文章</h1>

        <div v-for="(item, index) in list" :key="index">
          <LgCard :data="item"></LgCard>
        </div>
      </div>
    </Col>
  </Row>
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
    } else {
      try {
        let { data } = await $axios.post("/recent");
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
  // created() {
  //   this.$axios
  //     .post("/recent")
  //     .then(res => {
  //       this.list = res.data.data;
  //       console.log(res);
  //     })
  //     .catch(ress => {});
  // },
  methods: {
    toact(e) {
      this.$router.push({
        name: "index-article-name",
        params: { name: e.path[0].id }
      });
    }
  }
};
</script>

<style  scoped>
.time {
  font-size: 18px;
  font-weight: bold;
  text-align: right;
}
.recent {
  width: 90%;
  padding-top: 100px;
  max-width: 600px;
}
.title {
  padding-bottom: 2rem;
  color: #fff;
  text-align: right;
}
</style>