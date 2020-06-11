<template>
  <div>
    <div v-for="(item, index) in articles" :key="item._id">
      <LgCard class="card2" :data="item"></LgCard>
    </div>
  </div>
</template>

<script>
import LgCard from "../../../components/article-card";
export default {
  watch: {
    "$route.query": "$fetch"
  },
  async fetch() {
    try {
      console.log("aaaaa");
      let res = await this.$axios.post("/getLableArtivle", {
        id: this.id
      });
      this.articles = res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  scrollToTop: true,
  components: {
    LgCard
  },
  data() {
    return {
      articles: []
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    topage(e) {
      this.$router.push({
        name: "home-article-name",
        params: { name: e.target.id }
      });
    }
  }
};
</script>
<style scope lang="scss">
.card2 {
  width: 90%;
  margin: auto;
  max-width: 600px;
}
</style>
