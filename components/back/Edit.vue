<template>
  <div style="width:100%">
    <Row type="flex" justify="space-around" class-name="edit-title">
      <Col offset="5" span="12">
        <Input v-model="title" size="large" placeholder="请输入标题"></Input>
      </Col>
      <Col span="2">
        <Icon
          v-if="ishas"
          style="cursor: pointer"
          size="30"
          color="red"
          type="ios-trash-outline"
          @click="modal=true"
        />
      </Col>
    </Row>
    <Row>
      <Col>
       <div class="mavonEditor">
    <no-ssr>
      <mavon-editor  :toolbars="toolbars" v-model="content"/>
    </no-ssr>
  </div>
    
      </Col>
    </Row>
    <Row type="flex" justify="space-around" :gutter="24" class-name="edit-foote" align="middle">
      <Col span="5">
        <Poptip trigger="hover" content="切换选择模式">
          <Icon type="ios-swap" size="25" class="add" @click="addlei"/>
        </Poptip>
      </Col>
      <Col span="10">
        <Input v-if="!switchs" v-model="lei" placeholder="请输入新建类别" style="width: 200px"/>
        <Select v-else v-model="lei" clearable style="width:200px" @on-open-change="refresh">
          <Option v-for="item in leiList" :key="item._id" :value="item.name">{{ item.name }}</Option>
        </Select>
      </Col>
      <Col span="5">
        <Button type="primary" @click="commit">{{ btntext }}</Button>
      </Col>
    </Row>
    <Modal
      v-model="modal"
      title="警告"
      class-name="vertical-center-modal"
      @on-ok="deleteat"
      @on-cancel="modal=false"
    >
      <p>确定删除文章吗</p>
    </Modal>
    <div class="btm"></div>
  </div>
</template>
<script>

export default {
  components: {
   
  },
  data() {
    return {
      modal: false,
      img_file: [],
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

      switchs: true,
      leiList: ""
    };
  },
  computed: {
    ishas() {
      return this.$store.state.ishas;
    },
    atid() {
      return this.$store.state.atid;
    },
    content: {
      get() {
        return this.$store.state.content;
      },
      set(value) {
        this.$store.commit("updatectt", value);
      }
    },
    title: {
      get() {
        return this.$store.state.title;
      },
      set(value) {
        this.$store.commit("updatettl", value);
      }
    },
    lei: {
      get() {
        return this.$store.state.lei;
      },
      set(value) {
        this.$store.commit("updatelei", value);
      }
    },
    userId() {
      return this.$store.state.userid;
    },
    btntext() {
      return this.switchs ? "发表" : "添加";
    },

    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  created() {},
  methods: {
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
 
    
    refresh() {
      this.$axios.post("/getlei", { userid: this.userId }).then(res => {
        this.leiList = res.data.data;
        //console.log(this.lei);
        this.refuselist();
      });
      


    },

    addlei() {
      this.switchs = !this.switchs;
      this.lei = "";
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    async commit() {
      if (!this.switchs) {
        if (!this.lei) {
          this.$Message.error("麻烦输入类别");
        } else {
          this.$axios
            .post("/addlei", { lei: this.lei, userid: this.userId })
            .then(res => {
              if (res.data.code == 200) {
                this.switchs = !this.switchs;
                this.$Message.success("类别添加好了");
                this.refuselist();
              } else {
                this.$Message.error(res.data.msg);
              }
            })
            .catch(res => {
              this.$Message.error("网络错误");
            });
        }
      } else {
        if (!this.content) {
          this.$Message.error("麻烦写个字");
        } else if (!this.lei) {
          this.$Message.error("麻烦选个类");
        } else if (!this.title) {
          this.$Message.error("麻烦写标题");
        } else {
      

          let data = {
            lei: this.lei,
            content: this.content,
            title: this.title,
            userid: this.userId,
            atid: this.atid
          };

          //判断更新还是新建
          if (this.ishas) {
            this.$axios.post("/updatearticle", data).then(res => {
              this.$Message.success(res.data.msg);
              this.refuselist();
            }).catch()
          } else {
            this.$axios.post("/newarticle", data).then(res => {
              if (res.data.code == 201) {
                this.$Message.error(res.data.msg);
                return;
              }
              this.refuselist();
              this.$Message.success(res.data.msg);
            }).catch()
          }
        }
      }
    },
    refuselist() {
      setTimeout(() => {
        this.$axios.post("/getlist").then(res => {
          this.$store.commit("updatelist", res.data.data);
        }).catch()
      }, 500);
    }
  }
};
</script>
<style>
.mavonEditor {
  width: 100%;

}
.edit-title {
  padding: 2rem;
}
.edit-foote {
  padding-top: 2rem;
  z-index: 99999
}
.mdn {
  z-index: -999;
}

.add {
  color: #0288d1;
  cursor: pointer;
}
.add:hover {
  color: #b3e5fc;
}
.add:active {
  color: #05a7ff;
}
.btm {
  padding-bottom: 5rem;
}
</style>
