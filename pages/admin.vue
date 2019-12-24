<template>
  <div>
    <Row>
      <Col span="3">
      <Sidebar></Sidebar>
      </Col>
      <Col span="21">
      <Row>
        <Col>
          <div></div>
        <Head></Head>
        </Col>
      </Row>
      <Row>
        <Col>
        <div class='edit'>
          <Edit></Edit>
        </div>

        </Col>
      </Row>
      <Row>
        <Col>
        <Foote></Foote>
        </Col>
      </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import Head from "../components/back/Head";
import Sidebar from "../components/back/Sidebar";
import Foote from "../components/back/Foote";
import Edit from "../components/back/Edit";

export default {
    middleware: 'auth',
  name: "",
  components: {
    Head,
    Sidebar,
    Foote,
    Edit
  },
  data() {
    return {};
  },
  created() {
    this.$axios
      .post("/index")
      .then(res => {
        this.$store.commit("setUserId", res.data.data.userid);
      })
      .catch();
  }
};
</script>

<style scoped>
.ibody {
  padding: 2rem;
  padding-bottom: 10rem;
}
.edit {
  margin: auto;
  width: 80%;
  
  max-width: 1400px;
}
</style>