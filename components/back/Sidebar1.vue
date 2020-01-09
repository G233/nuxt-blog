<template>
  <div>
    <div @click="newarticle" class="NewBlog">
      写文章
    </div>
    <Menu theme="light" width="auto"@on-select="ChangeLei">
      <MenuItem v-for="(item, index) in list" :key="index" :name="index">
        {{ item.name }}
      </MenuItem>
    </Menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    list() {
      return this.$store.state.list;
    }
  },
  created() {
    this.$axios.post("/getlist").then(res => {
      this.$store.commit("updatelist", res.data.data);
    });
  },
  methods: {
    newarticle() {
      this.$store.commit("newatc");
    },
    ChangeLei(e) {
    //   console.log(e);
      this.$store.commit("ChangeLei",e);
    }
  }
};
</script>
<style scoped>
.NewBlog {
  height: 60px;
  width: 100%;
  background-color: #2d8cf0;
  font-weight: bold;
  cursor: pointer;
  line-height: 60px;
  text-align: center;
  color: white;
  font-size: 16px;
  letter-spacing: 10px;
}
.NewBlog:hover {
  background-color: #5cadff;
}
.NewBlog:active {
  background-color: #2b85e4;
}
</style>
