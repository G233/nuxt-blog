<template>
  <div style="background-color: white">
    <Row v-show="login">
      <!-- <div>
        <Col span="3" class-name="Sidebar">
          <Sidebar1></Sidebar1>
        </Col>
        <Col span="3" class-name="Sidebar">
          <Sidebar2></Sidebar2>
        </Col>
      </div> -->

      <div class="edit">
        <Edit></Edit>
      </div>
    </Row>
    <div v-show="!login" class="demo-spin-container">
      <Spin size="large">
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
        <div>检测登陆状态中</div>
      </Spin>
    </div>
  </div>
</template>

<script>
// import Sidebar1 from "../components/back/Sidebar1";
// import Sidebar2 from "../components/back/Sidebar2";
import Edit from "../components/back/Edit";

export default {
  // middleware: "auth",
  components: {
    // Sidebar1,
    // Sidebar2,

    Edit
  },
  methods: {
    tonginx() {
      window.open("http://119.29.177.240/verynginx/index_zh.html#");
    }
  },
  data() {
    return {
      login: false
    };
  },
  created() {
    if (!process.server) {
      let token = false;
      try {
        token = this.$store.state.authUser;
      } catch (e) {
        console.log(e);
      }
      if (token) {
        console.log("已经登陆");
        this.$axios.setToken(token, "Bearer");
        this.$store.commit("SET_USER", token);

        this.login = true;
        this.$Message.success("登陆成功");
      } else {
        console.log("未登陆");
        this.$router.push("/welcome");

        this.$Message.error("请登陆后使用");
      }

      // this.$axios
      //   .post("/index")
      //   .then(res => {
      //     this.$store.commit("setUserId", res.data.data.userid);
      //   })
      //   .catch();
    }
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
  max-width: 1000px;
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
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
.demo-spin-container {
  display: flex;
  height: 1000px;

  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
