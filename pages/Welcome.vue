<template>
  <div>
    <Row type="flex" justify="center">
      <Col class-name="login" span="4">
        <Login></Login>
      </Col>
    </Row>
  </div>
</template>
<script>
import Login from "../components/back/Login";

export default {
  components: {
    Login
  }
};
</script>
<style>
.login {
  margin-top: 500px;
  width: 600px;
  height: 350px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 3px 9px 20px 1px #b9b9b98a;
  padding: 50px;
  color: white;
}
</style>
