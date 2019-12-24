<template>
  <div class="toplan" :class="iscl?'tou1':'tou2'">
    <Row type="flex" justify="center" align="middle">
      <Col>
        <Row class-name="top" type="flex" justify="space-around" align="middle" :gutter="200">
          <Col>
            <Row type="flex" justify="center" align="middle">
              <div class="home" @click="tohome">
                <Col>
                  <h1 style="color:white;">AtomG</h1>
                </Col>
              </div>
            </Row>
          </Col>

          <Col>
            <Row type="flex" align="middle" :gutter="32">
              <div v-for="(item, index1) in list" :key="index1">
                <Col>
                  <div class="dropdown">
                    <div @click="tolist" :id="item._id" class="dropbtn">{{item.name}}</div>
                    <div class="dropdown-content1" style="height:35px;background-color: white;"></div>
                  </div>
                </Col>
              </div>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return { iscl: true };
  },
  computed: {
    list() {
      return this.$store.state.list;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },

  methods: {
    atlist() {
      //console.log("adwsd");
    },
    tohome() {
      this.$router.push("/");
    },
    tolist(e) {
      this.$router.push({
        name: "index-list-id",
        params: { id: e.target.id, name: e.target.textContent }
      });
    },
    scrollToTop() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 300) {
        this.iscl = false;
      } else {
        this.iscl = true;
      }
    }
  }
};
</script>


<style  scoped>
.toplan {
  padding: 1rem;
  width: 100%;
  transition: all 1s;
}
.tou1 {
  color: white;
}
.tou2 {
  color: white;
  opacity: 1;
  background-color: #088efd;
  /* box-shadow: 0px 1px 5px #cecaca; */
}
.top {
  min-width: 1350px;
}

.home {
  cursor: pointer;
}
.dropdown {
  font-size: 18px;
  cursor: pointer;
  position: relative;
}

.dropdown-content1 {
  display: none;
  position: absolute;

  background-color: rgb(255, 255, 255);

  width: 250px;
}

.dropdown:hover .dropbtn {
  color: #0288d1;
}
</style>