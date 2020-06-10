<template>
  <div>
    <div class="TagCard">
      <div v-for="(item, index) in allLabels" :key="item._id">
        <Tag @click.native="tolabel(item)" class="tag" size="large">
          {{ item.name }}
        </Tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      allLabels: []
    };
  },
  async fetch() {
    const res = await this.$axios.post("/v2/getAllLabel");
    this.allLabels = res.data.data;
  },
  methods: {
    tolabel(e) {
      console.log(e);
      this.$router.push({
        name: "home-list-id",
        params: { id: e._id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.TagCard {
  width: 500px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  .tag {
    cursor: pointer;
  }
}
</style>
