<template>
  <div>
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
<style scope lang="scss">
.card2 {
  width: 90%;
  margin: auto;
  max-width: 600px;
}
</style>
