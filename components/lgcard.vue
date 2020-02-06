<template>
  <div>
    <div class="card">
      <div class="cardt" @click="topage" :id="data._id">{{ data.title }}</div>
      <div class="cardc">{{ data.content }}</div>
      <Row style="margin-top:15px" >
        <Col span="12">
          <Button @click="topage" :id="data._id">Read more</Button>
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
      this.$router.push({
        name: "index-article-id",
        params: { id: this.data._id }
        
      });
    }
  }
};
</script>

<style scoped>
.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
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
  color: rgb(53, 159, 213);
}
.cardc {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.cardb {
  text-align: right;
  font-weight: 700;
  font-size: 13px;
  color: #808695;

}
</style>
