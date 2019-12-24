<template >
  <div style="position:relative">
    <div class="tou">
      <Head></Head>
    </div>

    <div>
      <div>
        <Toutu class="toutu"></Toutu>
      </div>

      <Row type="flex" justify="center" style="padding-top:100px">
        <Col>
          <MyCard></MyCard>
        </Col>
        <Col class-name="child">
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
import { async } from "q";
export default {
  components: {
    Toutu,
    Head,
    Foote,
    MyCard
  },
  async asyncData({ $axios, app }) {
    try {
      let res = await $axios.post("/api/getlist");
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
.child {
}
</style>