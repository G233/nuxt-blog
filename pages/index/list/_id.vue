<template>
  <div style=" padding-top: 100px;">
    <h1 class="title" style>{{name}}</h1>
    <h1 class="zhanwei" style></h1>
    <transition-group name="list">
      <div class="list-item" v-for="(item, index) in list" :key="item._id">
        <LgCard :data="item"></LgCard>
      </div>
    </transition-group>
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
        console.log(res);
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
<style >
.title {
  padding-bottom: 2rem;
  color: #fff;
  text-align: right;
}

.zhanwei {
  width: 600px;
}
/* .list-item {
  transition: all 0.5s;
}

.list-enter {
  transform: translateX(200px);
  opacity: 0;
}
.list-leave-to {
  position: absolute;
  opacity: 0;
}
.list-leave-active {
  position: absolute;
  transform: translateX(-100px);
} */
</style>