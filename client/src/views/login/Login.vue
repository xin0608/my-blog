<template>
  <div class="bg">
    <div class="logo"><img src="../../../public/logo2.png" /></div>
    <div class="title">欢迎来到 闪闪发光的星星 的个人博客</div>
    <div class="login-form">
      <h1>登录</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <p>
        没有账号?
        <span @click="handleToRegister" class="btn-register">立即注册</span>
      </p>
    </div>
  </div>
</template>
<script>
import { post } from "../../utils/request";
export default {
  name: "Login",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      const reg = /^1[3-9]\d{9}$/;
      setTimeout(() => {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      }, 1000);
    };
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

    return {
      ruleForm: {
        pass: "",
        phone: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert("submit!");

          const { pass, phone } = this.ruleForm;
          const result = await post("/api/user/login", {
            username: phone,
            password: pass,
          });

          if (result.errno === 0) {
            this.$message({
              message: "恭喜你，登录成功",
              type: "success",
            });
            localStorage.username = phone;
            // 跳转到主页
            this.$router.push("/home");
          } else {
            this.$message.error("登录失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
<style lang="scss" >
.bg {
  position: relative;
  width: 100vw;
  height: 100vh;

  .logo {
    width: 130px;
    padding: 5px;
    img {
      width: 100%;
    }
  }
  .title {
    width: 400px;
    height: 100px;
    position: absolute;
    left: 40%;
    top: 50%;
    margin-top: -50px;
    margin-left: -200px;
    font-weight: 1000;
    color: rgba(0, 0, 0, 0.511);
    text-align: center;
  }
  .login-form {
    position: absolute;
    top: 100px;
    right: 50px;
    width: 370px;
    height: 260px;
    padding: 15px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: -20px 0 20px 5px rgba(213, 255, 145, 0.5),
      0px -20px 20px 5px rgba(145, 255, 191, 0.5),
      20px 0 20px 5px rgba(82, 255, 220, 0.5),
      0 20px 20px 5px rgba(239, 255, 91, 0.5);
    h1 {
      font-weight: 1000;
    }
    .el-form-item__label {
      width: auto !important;
    }

    .el-form-item__content {
      margin-left: 0 !important;
    }
    p {
      border-top: 1px solid #cac9c9;
      padding-top: 10px;
      font-size: 10px;
      color: #cac9c9;
      span {
        // 光标变成手指状态
        cursor: pointer;
        color: rgb(94, 219, 231);
      }
    }
  }
}
.bg::after {
  content: "";
  background: url(../../../public/bg.jpg);
  background-size: cover;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
}
</style>