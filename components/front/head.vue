<template>
  <div>
    <div class="toplan2 show">
      <div class="home-txt" @click="tohome">AtomG</div>
      <div :class="homeicon" @click="showlist">
        <Icon size="30" type="md-list" />
      </div>
      <div :class="homelist">
        <div
          class="home-list-text"
          v-for="(item, index1) in list"
          :key="index1"
          @click="tolist"
          :id="item._id"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="toplan" :class="iscl ? 'tou1' : 'tou2'">
      <Row type="flex" justify="center" align="middle">
        <Col>
          <Row
            class-name="top"
            type="flex"
            justify="space-around"
            align="middle"
            :gutter="200"
          >
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
                      <div @click="tolist" :id="item._id" class="dropbtn">
                        {{ item.name }}
                      </div>
                      <div
                        class="dropdown-content1"
                        style="height:35px;background-color: white;"
                      ></div>
                    </div>
                  </Col>
                </div>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { iscl: true, showMore: false };
  },
  computed: {
    list() {
      return this.$store.state.list;
    },
    homeicon() {
      if (this.showMore) {
        return "home-icon home-icon-r";
      } else {
        return "home-icon";
      }
    },
    homelist() {
      if (this.showMore) {
        return "home-list home-list-hide ";
      } else {
        return "home-list";
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },

  methods: {
    showlist() {
      this.showMore = !this.showMore;
    },
    tohome() {
      this.$router.push("/");
    },
    tolist(e) {
      this.showMore=false
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

<style scoped>

.toplan {
  padding: 1rem;
  width: 100%;
  transition: all 1s;
}
.toplan2 {
  position: relative;
  background-color: #088efd;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.home-txt {
  margin-left: 30px;
  font-weight: bold;
  color: white;
  font-size: 20px;
}
.home-icon {
  color: white;
  font-size: 20px;
  margin-right: 30px;
  transition: all 0.5s;
}
.home-icon-r {
  transform: rotate(90deg);
}
.home-list {
  position: absolute;
  top: 60px;
  width: 100%;
  height: 0px;
  overflow: hidden;
  background-color: #088efd;
  color: white;
  display: flex;
  flex-direction: column;
  transition: height 0.3s ease-in-out;
  font-size: 16px;
  font-weight: 600; 

}
.home-list-hide {
  height: 170px;
}
.home-list-text {
  text-align: center;
  margin: 5px;
}
.home-list-text:first-child {
  margin-top: 0px;
}
.home-list-text:last-child {
  margin-bottom: 10px;
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
@media screen and (max-width: 840px) {
  .toplan {
    display: none;
  }
}
@media screen and (min-width: 840px) {
  .toplan2{
    display:none;
  }
}
</style>
