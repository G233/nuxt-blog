<template>
  <div>
    <div class="card">
      <div class="cardt" @click="topage" :id="data._id">{{ data.title }}</div>
      <div class="cardc">{{ data.abstract }}</div>
      <Row type="flex" align="bottom" style="margin-top:15px;">
        <Col span="12">
          <Button @click="topage" :id="data._id">阅读全文</Button>
        </Col>
        <Col span="12">
          <div class="cardb">{{ data.createdAt.split("T")[0] }}</div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    topage() {
      try {
        this.$router.push({
          name: "home-article-id",
          params: { id: this.data._id }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
.card {
  background-color: white;
  padding: 0.4rem;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
}
.cardt {
  font-size: 19px;
  font-weight: bold;
  padding-bottom: 10px;
  transition: color 0.2s;
  cursor: pointer;
  text-align: start;
}
.cardt:hover {
  color: #808695;
}
.cardc {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.cardb {
  text-align: right;
  font-weight: 700;
  font-size: 13px;
  color: #808695;
}
</style>
