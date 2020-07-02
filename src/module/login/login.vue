<template>
  <div class="login">
    <vcanvas width="100%" height="100vh" id="canvas"></vcanvas>
    <div class="loginbox">
      <div class="logincheck">
        <el-radio
          v-for="(ele,index) in num"
          :key="index"
          v-model="iflogin"
          :label="ele.value"
          border
        >{{ele.lable}}</el-radio>
      </div>
      <p class="title">{{iflogin == '1'?'管理员账号登录':'管理员扫码登录'}}</p>
      <el-collapse-transition name="el-zoom-in-center">
        <el-form
          v-if="iflogin == '1'"
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="name">
            <el-input
              type="name"
              prefix-icon="el-icon-user"
              placeholder="请输入您的姓名"
              clearable
              v-model="ruleForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              type="password"
              prefix-icon="el-icon-goods"
              placeholder="请输入您的密码"
              clearable
              v-model="ruleForm.pass"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              prefix-icon="el-icon-goods"
              placeholder="请确认您的密码"
              clearable
              v-model="ruleForm.checkPass"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:400px" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-transition>
      <el-collapse-transition name="el-zoom-in-center">
        <div class="weixin" v-if="iflogin == '2'">
          <img
            src="https://s-q.mxcdn.cn/2019/12/27/FmRB6nXuPKIDgKO0G9OCJjyMreup.png?time=1577430443554"
          />
          <p style="color:red">我是假的码</p>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
import Vcanvas from "../../components/base_m/canvas";
export default {
  components: {
    Vcanvas
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        pass: "",
        checkPass: ""
      },
      num: [
        { value: "1", lable: "账号登录" },
        { value: "2", lable: "扫码登录" }
      ],
      iflogin: "",
      rules: {
        name: [{ required: true, message: "名字不为空", trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.iflogin = "1";
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/kapi/login", this.ruleForm)
            .then(res => {
              if (res.data.code == 200) {
                sessionStorage.setItem("user", JSON.stringify(res.data.data));
                history.go(0);
              }
            })
            .catch(err => {
              sessionStorage.setItem("user", JSON.stringify(this.ruleForm));
              // window.location.href = '/Vue-pro/dist/index.html'
              history.go(0);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.login {
  .loginbox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background: #fff;
    border-radius: 6px;
    padding: 20px 30px;
    .logincheck {
      position: absolute;
      top: -52px;
      left: 0px;
      background: #fff;
      width: 460px;
      padding: 5px 0px;
      border-radius: 5px;
      text-align: center;
    }
    .title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
    }
  }
  .weixin {
    margin-bottom: 30px;
  }
}
</style>
<style rel='stylesheet/less' lang='less'>
</style>