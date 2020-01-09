<template>
  <div>
    <Menu theme="light" width="auto" @on-select="changepage" >
      <MenuItem v-for="(item, index) in LeiList" :key="index" :name="index">
        {{item}}
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
    LeiList() {
      return this.$store.state.LeiList;
    }
  },
  created() {
  
   
  },
  methods: {
    changepage(e) {
      let data = {
        userid: this.$store.state.userid,
        name: this.LeiList[e]
      };
      console.log(data)
      this.$axios.post("/getarticle1", data).then(res =>{
        res.data.data.istrue=true
        this.$store.commit("changearticle", res.data.data);
      });
    }

  }
};
</script>
<style scoped>

</style>
