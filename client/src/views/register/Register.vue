<template>
  <div class="register-bg">
    <div class="logo"><img src="../../../public/logo2.png" /></div>
    <div class="title">快来领取你的通行证</div>
    <div class="register-form">
      <h1>注册</h1>
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
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
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
      <p @click="handleToLogin">去登录</p>
    </div>
  </div>
</template>
<script>
import { post } from "../../utils/request";

export default {
  name: "Register",
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
        phone: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { pass, phone } = this.ruleForm;
          const result = await post("/api/user/register", {
            username: phone,
            password: pass,
          });

          if (result.errno === 0) {
            this.$message({
              message: "恭喜你，注册成功",
              type: "success",
            });
          } else {
            this.$message.error("注册失败");
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
    handleToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss" >
.register-bg {
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
    margin-bottom: 40px;
    font-weight: 1000;
    color: rgba(0, 0, 0, 0.511);
    text-align: center;
  }

  .register-form {
    position: absolute;
    left: 50%;
    margin-left: -200px;
    width: 400px;
    height: 330px;
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
      padding-top: 5px;
      font-size: 14px;
      cursor: pointer;
      color: rgb(94, 219, 231);
    }
  }
}
.register-bg::after {
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