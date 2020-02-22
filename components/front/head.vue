<template>
  <div>
    <div class="head-component-min">
      <div class="home-txt" @click="tohome">主页</div>

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
    <div class="head-component-max">
      <div class="lei-list">
        <div @click="tohome" style="margin-left:80px" class="lei-text">
          主页
        </div>
        <nuxt-link class="home-txt" to="/home">首页</nuxt-link>
        <div
          class="lei-text"
          v-for="(item, index1) in list"
          :key="index1"
          @click="tolist"
          :id="item._id"
        >
          {{ item.name }}
        </div>
      </div>
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
        return "home-list home-list-show ";
      } else {
        return "home-list";
      }
    }
  },

  methods: {
    showlist() {
      this.showMore = !this.showMore;
    },
    tohome() {
      this.$router.push("/home");
    },
    tolist(e) {
      this.showMore = false;
      this.$router.push({
        name: "index-list-id",
        params: { id: e.target.id, name: e.target.textContent }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.head-component-min {
  box-shadow: 8px 28px 50px rgba(39, 44, 49, 0.07),
    1px 6px 12px rgba(39, 44, 49, 0.04);
  position: relative;
  background-color: $main-color;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .home-txt {
    margin-left: 30px;
    font-weight: bold;
    cursor: pointer;
    font-size: 20px;
  }
  .home-icon {
    font-size: 20px;
    margin-right: 30px;
    transition: all 0.3s ease-in-out;
  }
  .home-icon-r {
    transform: rotate(90deg);
  }
  .home-list {
    position: absolute;
    top: 60px;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    background-color: $main-color;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease-in-out;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 8px 28px 50px rgba(39, 44, 49, 0.07),
      1px 6px 12px rgba(39, 44, 49, 0.04);
  }
  .home-list-show {
    max-height: 500px;
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
}
.head-component-max {
  line-height: 60px;
  height: 60px;
  background-color: white;
  box-shadow: 8px 28px 50px rgba(39, 44, 49, 0.07),
    1px 6px 12px rgba(39, 44, 49, 0.04);
  .lei-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .lei-text {
      cursor: pointer;
      color: $sub-color;
      margin-left: 20px;
      font-size: 16px;
    }
    .lei-text:hover {
      color: $title-color;
    }
  }
}
@media screen and (max-width: 840px) {
  .head-component-max {
    display: none;
  }
}
@media screen and (min-width: 840px) {
  .head-component-min {
    display: none;
  }
}
</style>
