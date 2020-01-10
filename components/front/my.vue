<template>
  <div class="mycard">
    <Row>
      <div class="touxiang">
        <img
          width="100%"
          src="https://blog-1257163508.cos.ap-guangzhou.myqcloud.com/%E5%A4%B4%E5%83%8F/5b0a81bae3f8a.png"
        />
      </div>
    </Row>
    <Row>
      <h3>AtomG</h3>
    </Row>
    <Row class-name="row" style="margin-top:30px" :gutter="16" type="flex" justify="center">
      <Col>
        <Icon size="16" type="logo-github" />
      </Col>
      <Col>
        <div class="github" @click="togithub">Github</div>
      </Col>
    </Row>
    <Row class-name="row" style="margin-top:30px" :gutter="16" type="flex" justify="center">
    
      <Col>
        <div style="font-weight: bold;cursor: pointer;" v-clipboard:copy="email" v-clipboard:success="CopyEmail" >{{email}}</div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      email:'atomg1024@gmail.com'
    };
  },
  methods: {
    togithub() {
      window.open("https://github.com/G233");
    },
    CopyEmail(){
      
       this.$Message.success("已复制邮箱地址");

    }
  }
};
</script>

<style  scoped>
.mycard {
  position: sticky;
  display: inline-block;
  top: 85px;
  margin-top: 192px;
  margin-right: 30px;
  height: 400px;
  text-align: center;
  width: 180px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}
.touxiang {
  width: 80%;
  height: 100px;
  margin: auto;
  margin-top: 20px;
}
.row {
  font-weight: 500;
}
.github {
  cursor: pointer;
  font-weight: bold
}
.github:hover {
  background-color: whitesmoke;
}
</style>