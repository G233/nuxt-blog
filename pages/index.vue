<template>
  <div style="position:relative">
    <div class="tou">
      <Head></Head>
    </div>
    <div>
      <div class="top-pad">
        <Toutu class="toutu"></Toutu>
      </div>

      <Row >
        <Col>
          <nuxt-child />
        </Col>
      </Row>
      <Row>
        <Foote></Foote>
      </Row>
    </div>
  </div>
</template>

<script>
import Foote from "../components/front/foote";
import Toutu from "../components/front/toutu";
import Head from "../components/front/head";
import MyCard from "../components/front/my";
export default {
  components: {
    Toutu,
    Head,
    Foote,
    MyCard
  },
  async asyncData({ $axios, app }) {
    try {
      let res = await $axios.post("api/getlist");
      app.store.commit("updatelist", res.data.data);
    } catch (e) {
      console.log(e);
    }
  },
  computed: {},

  data() {
    return {};
  }
};
</script>

<style>
.tou {
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 1000;
}
.toutu {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}
.top-pad{
    padding-bottom:200px;
}

@media screen and (max-width: 840px) {
  .mycard {
    display: none;
  }
  .toutu {
    display: none;
  }
  .top-pad{
    padding-bottom:100px;
}
}
</style>
