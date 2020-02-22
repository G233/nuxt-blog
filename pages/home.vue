<template>
  <div>
    <div class="top">
      <Head></Head>
    </div>
    <div class="body">
      <nuxt-child />
    </div>

    <div>
      <Foote></Foote>
    </div>
  </div>
</template>

<script>
import Foote from "../components/front/foote";
import Head from "../components/front/head";
export default {
  async asyncData({ $axios, app }) {
    try {
      let res;
      if (process.server) {
        res = await $axios.post("api/getlist");
      } else {
        res = await $axios.post("getlist");
      }

      app.store.commit("updatelist", res.data.data);
    } catch (e) {
      console.log(e);
    }
  },
  components: {
    Head,
    Foote
  },
  computed: {},

  data() {
    return {};
  }
};
</script>

<style>
.top {
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 100;
}
.body {
  width: 95vw;
  margin: auto;
  margin-top: 3rem;
  max-width: 15rem;
  padding-top: 0.2rem;
  box-shadow: 8px 28px 50px rgba(39, 44, 49, 0.07),
    1px 6px 12px rgba(39, 44, 49, 0.04);
  min-height: 1000px;
}
</style>
