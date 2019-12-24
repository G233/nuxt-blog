
<template>
  <Form
    ref="formCustom"
    :model="formCustom"
    :rules="ruleCustom"
    :label-width="80"
  >
    <FormItem
      label="用户名"
      prop="name"
    >
      <Input v-model="formCustom.name"></Input>
    </FormItem>
    <FormItem
      label="邮箱"
      prop="mail"
    >
      <Input
        v-model="formCustom.mail"
        :search="!codebtn"
        :enter-button="codebtntext"
        @on-search="sendcode('formCustom')"
      ></Input>
    </FormItem>
    <FormItem
      v-if="codeinput"
      label="验证码"
      prop="code"
    >
      <Input
        v-model="formCustom.code"
        type="text"
        number
      ></Input>
    </FormItem>
    <FormItem
      label="密码"
      prop="passwd"
    >
      <Input
        v-model="formCustom.passwd"
        type="password"
      ></Input>
    </FormItem>
    <FormItem
      label="重复密码"
      prop="passwdCheck"
    >
      <Input
        v-model="formCustom.passwdCheck"
        type="password"
      ></Input>
    </FormItem>

    <FormItem>
      <Button
        type="primary"
        @click="handleSubmit('formCustom')"
      >
        注册
      </Button>
      <Button
        style="margin-left: 8px"
        @click="handleReset('formCustom')"
      >
        清除
      </Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.formCustom.passwd) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写验证码"));
      }
      //验证验证码
      let data = {
        code: this.formCustom.code,
        email: this.formCustom.mail
      };

      this.$axios.post("/checkcode", data).then(res => {
        if (res.data.code == 201) {
          callback(new Error("验证码错误"));
        } else {
          callback();
        }
      });
    };

    return {
      formCustom: {
        name: "",
        passwd: "",
        passwdCheck: "",
        mail: "",
        code: ""
      },
      codetime: 30,
      codebtntext: "发送验证码",
      codebtn: false,
      codeinput: false,
      ruleCustom: {
        passwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        passwdCheck: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePassCheck, trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式错误", trigger: "blur" }
        ],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  methods: {
    sendcode(e) {
      this.$refs.formCustom.validateField("mail", valid => {
        if (!valid) {
          let data = {
            email: this.formCustom.mail
          };
          this.$axios.post("/mailcode", data).then(res => {
            if (res.data.code == 200) {
              this.$Message.success(res.data.msg);
              this.codebtn = true;
              setTimeout(this.subs, 1000);
              this.codeinput = true;
            } else {
              this.$Message.error(res.data.msg);
            }
          });
        }
      });
    },

    subs() {
      //验证码倒计时
      if (this.codetime > 0) {
        this.codetime -= 1;
        setTimeout(this.subs, 1000);
      } else {
        this.codebtntext = "发送验证码";
        this.codebtn = false;
        this.codetime = 30;
      }
    },
    handleSubmit(name) {
      this.$refs.formCustom.validate(valid => {
        if (valid) {
          if (!this.formCustom.code) {
            this.$Message.error("请验证邮箱");
            return;
          }
          let data = {
            code: this.formCustom.code,
            email: this.formCustom.mail,
            passwd: this.formCustom.passwd,
            name: this.formCustom.name
          };

          this.$axios.post("/register", data).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("注册成功");
            }
          });
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style>
.youxiang {
  margin-top: 1rem;
}
</style>

