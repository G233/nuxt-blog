<template>
  <Form
    ref="formCustom"
    :model="formCustom"
    :rules="ruleCustom"
    :label-width="80"
  >
    <FormItem label="邮箱" prop="mail">
      <Input v-model="formCustom.mail"></Input>
    </FormItem>

    <FormItem label="密码" prop="passwd">
      <Input v-model="formCustom.passwd" type="password"></Input>
    </FormItem>

    <FormItem>
      <Button type="primary" @click="handleSubmit('formCustom')">
        登陆
      </Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  data() {
    const validateCode = (rule, value, callback) => {
      // 模拟异步验证效果
      if (!value) {
        return callback(new Error("请填写验证码"));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入验证码"));
        } else {
          if (value < 18) {
            callback(new Error("Must be over 18 years of age"));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    return {
      formCustom: {
        passwd: "",

        mail: ""
      },
      ruleCustom: {
        passwd: [{ required: true, message: "请输入密码", trigger: "blur" }],

        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式错误", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async handleSubmit(name) {
      this.$refs.formCustom.validate(async valid => {
        if (valid) {
          let data = {
            passwd: this.formCustom.passwd,
            email: this.formCustom.mail
          };

          //   await this.$store.dispatch('login', {
          //   passwd: this.formCustom.passwd,
          //     email: this.formCustom.mail
          // })
          this.$axios.post("/v2/Login", data).then(res => {
            if (res.data.code == 201) {
              this.$Message.error("邮箱或密码错误");
            } else {
              console.log(res.data.data);

              localStorage.setItem("token", res.data.data.token);
              this.$store.commit("SET_USER", res.data.data.token);

              this.$router.push("/admin");
            }
          });
        } else {
          this.$Message.error();
        }
      });
    }
  }
};
</script>
<style scoped>
.youxiang {
  margin-top: 60px;
}
</style>
