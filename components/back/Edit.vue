<template>
  <div class="edit">
    <div class="edit-title">
      <Input
        v-model="articleDate.title"
        size="large"
        placeholder="请输入标题"
      ></Input>
    </div>
    <div class="btns">
      <div>
        <Tag
          v-for="item in articleDate.labels"
          :key="item"
          :name="item"
          closable
          @on-close="handleClose"
          >{{ item.name }}</Tag
        >
        <Dropdown>
          <Button type="primary">
            添加标签
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <div @click="handleAdd(item)" v-for="item in alllabel">
              <DropdownItem>{{ item.name }}</DropdownItem>
            </div>
            <div @click="addlabel">
              <DropdownItem divided>新建标签</DropdownItem>
            </div>
          </DropdownMenu>
        </Dropdown>
        <Button type="success" @click="commit">发表</Button>
        <Button v-if="ishas" @click="modal = true" type="error">删除</Button>
      </div>
      <div>
        <!-- <Button class="nginx" @click="tonginx" type="primary">Nginx</Button> -->
        <Button type="success" @click="initData">写作</Button>
      </div>
    </div>

    <!-- <Row class-name="lan" type="flex" justify="space-around">
        <Col span="">
          <Input
            v-if="!switchs"
            v-model="lei"
            placeholder="请输入新建类别"
            style="width: 200px"
          />
          <Select
            v-else
            v-model="lei"
            clearable
            style="width:200px"
            @on-open-change="refresh"
          >
            <Option
              v-for="item in leiList"
              :key="item._id"
              :value="item.name"
              >{{ item.name }}</Option
            >
          </Select>
        </Col>
        <Col>
          <Icon type="md-add" size="25" :class="add" @click="addlei" />
        </Col>
        <Col>
          <Button type="primary" @click="commit">{{ btntext }}</Button>
        </Col>
        <Col>
          <Button v-if="ishas" @click="modal = true" type="error">删除</Button>
        </Col>
      </Row> -->

    <!-- <div class="abstract-text">
      <Input
        v-model="abstract"
        type="textarea"
        :rows="10"
        placeholder="这里输入摘要"
      />
    </div> -->

    <Row>
      <Col>
        <div class="mavonEditor">
          <mavon-editor
            class="v-note-wrapper"
            :toolbars="toolbars"
            v-model="articleDate.content"
          />
        </div>
      </Col>
    </Row>

    <Modal
      v-model="modal"
      title="警告"
      class-name="vertical-center-modal"
      @on-ok="deleteat"
      @on-cancel="modal = false"
    >
      <p>确定删除文章吗</p>
    </Modal>
    <div class="btm"></div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      articleDate: {
        content: "",
        title: "",
        abstract: "",
        labels: []
      },

      newArticle: true,
      alllabel: [],
      newlable: "",
      modal: false,
      toolbars: {
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code

        htmlcode: true, // 展示html源码

        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */

        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true // 右对齐
      },
      switchs: true
      // leiList: ""
    };
  },
  computed: {
    ChangeArticleId() {
      return this.$store.state.ChangeArticleId;
    },
    ishas() {
      return this.$store.state.ishas;
    },
    atid() {
      return this.$store.state.atid;
    }
  },
  async mounted() {
    if (this.ChangeArticleId) {
      let res = await this.$axios.post("/v2/getFallArticle", {
        id: this.ChangeArticleId
      });
      this.newArticle = false;
      this.articleDate = res.data.data;
    }
  },
  created() {
    // this.refresh();
    this.getAllLabel();
  },
  methods: {
    initData() {
      this.articleDate = this.$options.data().articleDate;
      this.newArticle = true;
      this.$Message.success("开始写作吧");
    },
    addlabel() {
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: "输入新的标签吧"
            },
            on: {
              input: val => {
                this.newlable = val;
              }
            }
          });
        },
        onOk: () => {
          this.addnewlabel();
        },
        loading: true
      });
    },
    async getAllLabel() {
      let res = await this.$axios.post("/v2/getAllLabel");
      console.log(res);
      this.alllabel = res.data.data;
      return;
    },
    async addnewlabel() {
      let res = await this.$axios.post("/v2/addlabel", { name: this.newlable });
      if (res.data.code === 201) {
        this.$Message.error(res.data.msg);
      } else {
        await this.getAllLabel();
        this.$Message.success("添加成功");
      }
      this.$Modal.remove();
    },
    handleClose(event, name) {
      const index = this.articleDate.labels.indexOf(name);
      this.articleDate.labels.splice(index, 1);
    },
    handleAdd(item) {
      for (let x of this.articleDate.labels) {
        if (item._id === x._id) {
          this.$Message.warning("请不要重复选择标签");
          return;
        }
      }
      this.articleDate.labels.push(item);
    },
    async deleteat() {
      let res = await this.$axios.post("/deleteat", {
        atid: this.atid,
        userid: this.userId
      });
      if (res.data.code == 200) {
        this.$Message.success("文章删除成功");
        this.refuselist();
      }
    },
    async commit() {
      if (!this.articleDate.content) {
        this.$Message.error("请输入文章内容");
      } else if (!this.articleDate.title) {
        this.$Message.error("请输入标题");
      } else if (!this.articleDate.labels.length === 0) {
        this.$Message.error("至少选择一个标签");
      } else {
        let data = this.articleDate;
        //判断更新还是新建
        if (!this.newArticle) {
          // 需要添加 id
          let res = await this.$axios.post("/v2/updateArticle", data);
          this.$Message.success(res.data.msg);
        } else {
          let res = await this.$axios.post("/v2/addArticle", data);
          if (res.data.code == 201) {
            this.$Message.error(res.data.msg);
            return;
          }

          this.$Message.success(res.data.msg);
        }
      }
    }
  }
};
</script>
<style lang="scss">
.edit {
  margin: auto;
  width: 95%;
}
// .abstract-text {
//   width: 50%;
//   margin: 0 auto;
//   margin-bottom: 60px;
// }
// .mavonEditor {
//   margin: auto;
// }
.v-note-wrapper {
  z-index: 0 !important;
  height: 85vh;
}
.edit-title {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  input {
    font-weight: bold;
    font-size: 24px;
  }
}
// .add {
//   color: #0288d1;
//   cursor: pointer;
//   transition: transform 0.2s ease;
// }
// .add:hover {
//   color: #b3e5fc;
// }
// .add:active {
//   color: #05a7ff;
// }
// .add-r {
//   transform: rotate(45deg);
// }
// .lan {
//   width: 470px;
//   margin: auto;
// }
.btns {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
