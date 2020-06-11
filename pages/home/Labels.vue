<template>
  <div>
    <div class="TagCard">
      <div v-show="closable" v-for="(item, index) in allLabels" :key="item._id">
        <Tag
          @click.native="tolabel(item)"
          closable
          class="tag"
          size="large"
          @on-close="handleClose(item.name, item._id)"
        >
          {{ item.name }}
        </Tag>
      </div>
      <div
        v-show="!closable"
        v-for="(item, index) in allLabels"
        :key="item._id"
      >
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
    const res = await this.$axios.post("/getAllLabel");
    this.allLabels = res.data.data;
  },
  methods: {
    async handleClose(name, id) {
      console.log(name, id);
      let res = await this.$axios.post("/deleteLabel", { id: id });
      if (res.data.code == 200) {
        let index = 0;
        for (let i = 0; i < this.allLabels.length; i++) {
          if (id === this.allLabels[i]._id) {
            index = i;
          }
        }
        this.allLabels.splice(index, 1);
        this.$Message.success(res.data.msg);
      } else {
        this.$Message.warning(res.data.msg);
      }
    },
    tolabel(e) {
      console.log(e);
      this.$router.push({
        name: "home-list-id",
        params: { id: e._id }
      });
    }
  },
  computed: {
    closable() {
      return this.$store.state.authUser ? true : false;
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
