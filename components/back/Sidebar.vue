<template>
  <div>
    <Row
      type="flex"
      justify="center"
      align="middle"
      class-name="tou"
    >
      <Col>
      <h1>Create</h1>
      </Col>
    </Row>
    <Row>
      <div>
        <Menu
          width="auto"
          @on-select="changepage"
        >
          <div
            v-for="(item, index) in list"
            :key="index"
          >
            <Submenu :name="index">
              <template slot="title">
                {{ item.name }}
              </template>
              <div>
                <MenuItem
                  v-for="(ite, index) in item.list"
                  :key="index"
                  :name="ite"
                >
                  {{ ite }}
                </MenuItem>
              </div>
            </Submenu>
          </div>
        </Menu>
      </div>
    </Row>
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
    changepage(e) {
      //console.log(e);
      let data = {
        userid: this.$store.state.userid,
        name: e
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
.tou {
  background: #00bcd4;
  color: #ffffff;
  font-size: 22px;
  height: 6rem;
}
</style>


