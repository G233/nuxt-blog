<template>
  <div>
    <Row
      class-name="head"
      type="flex"
      justify="end"
      align="middle"
    >
      <Col span="3">
      <Button
        type="default"
        icon="md-add"
        ghost
        @click="newarticle"
      >
        新建文章
      </Button>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    newarticle() {
      this.$store.commit("newatc");
    }
  }
};
</script>

<style scoped>
.head {
  background: #00bcd4;
  color: #ffffff;
  font-size: 19px;
  height: 6rem;
}
</style>