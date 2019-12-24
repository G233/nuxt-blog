<template>
  <Row class-name="foote" type="flex" justify="center" align="middle">
    <Col>
      <a href="http://www.beian.miit.gov.cn">湘ICP备18002980号</a>
    </Col>
  </Row>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {},
  watch: {
    $route(to, from) {
      this.addweb();
    }
  }
};
</script>
<script>
</script>

<style scoped>
.foote {
  padding-top: 6rem;
  padding-bottom: 1rem;
}
</style>