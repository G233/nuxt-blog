<template>
  <div>
    <h1 class="title">{{ name }}</h1>
    <div v-for="(item, index) in list" :key="item._id">
      <LgCard class="card2" :data="item"></LgCard>
    </div>
  </div>
</template>

<script>
import LgCard from "../../../components/lgcard";
export default {
  components: {
    LgCard
  },

  watch: {
    async $route(to, from) {
      this.getlists();
    }
  },
  data() {
    return { list: "", name: "" };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  async created() {
    this.getlists();
  },
  methods: {
    async getlists() {
      try {
        let res = await this.$axios.post("/getlists", {
          id: this.id
        });
        this.list = res.data.data;
        this.name = res.data.msg;
      } catch (e) {}
    },
    topage(e) {
      this.$router.push({
        name: "index-article-name",
        params: { name: e.target.id }
      });
    }
  }
};
</script>
<style scope>
.title {
  padding-bottom: 2rem;
  color: #fff;
  text-align: center;
}
.card2{
  width: 90%;
  margin: auto
}

@media screen and (max-width: 840px) {
  .title {
    color: #17233d;
  }
}
</style>
