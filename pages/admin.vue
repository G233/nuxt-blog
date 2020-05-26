<template>
  <div style="background-color: white">
    <Row>
      <div>
        <Col span="3" class-name="Sidebar">
          <Sidebar1></Sidebar1>
        </Col>
        <Col span="3" class-name="Sidebar">
          <Sidebar2></Sidebar2>
        </Col>
      </div>

      <Col span="18">
        <div class="edit">
          <client-only>
            <Edit></Edit>
          </client-only>
        </div>
        <Button class="nginx" @click="tonginx" type="primary">Nginx</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
import Sidebar1 from "../components/back/Sidebar1";
import Sidebar2 from "../components/back/Sidebar2";
import Edit from "../components/back/Edit";

export default {
  middleware: "auth",
  name: "",
  components: {
    Sidebar1,
    Sidebar2,

    Edit
  },
  methods: {
    tonginx() {
      window.open("http://119.29.177.240/verynginx/index_zh.html#");
    }
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
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:white");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  }
};
</script>

<style scoped>
.edit {
  margin: auto;
  /* width: 100%; */
}
.Sidebar {
  background-color: white;
  height: 100vh;
  border-right: 1px solid #e8eaec;
}
.nginx {
  float: right;
  margin-right: 20px;
  margin-top: 20px;
}
</style>
