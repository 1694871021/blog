<template>
  <div class="login">
    <div class="login-image">
      <img style="width: 100%;" src="../static/images/c6064c3cffb086f20b3ede738184432b.jpeg" alt="">
    </div>
    <div class="login-box">
      <div class="login-title">
        登录
        <p>
          没有账号？
          <router-link>去注册 </router-link>
        </p>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="" prop="phone" label-width="20px">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password" label-width="20px">
          <el-input v-model="ruleForm.password"  placeholder="请输入密码(字母、数字且长度大于等于6位)"></el-input>
        </el-form-item>
        <el-form-item label="" prop="passcode" label-width="20px" class="pass-code">
          <el-input v-model="ruleForm.passcode"  placeholder="请输入验证码"></el-input>
          <img src="" alt="" class="code-image">
        </el-form-item>
        <el-form-item  class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
        </el-form-item>
      </el-form>
      <div class="login-line">
        <p>其他登录方式</p>
      </div>
      <div class="other-login">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-qq"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-weixinmw"></use>
        </svg>
      </div>
      <div class="bottom-image">
        <img src="../static/images/qeqeqw20221226141936.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkCall = (rule, value, callback) => {
      var reg = new RegExp(/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/);
      if(reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确手机号'));
      }
    }
    var checkPass = (rule, value, callback) => {
      var reg = new RegExp(/(0-9{1,}a-Z{1,})/);
      if(reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确密码'));
      }
    }
    return {
      ruleForm: {
        phone: '',
        password: '',
        passcode: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 6, message: '长度大于等于6个字符', trigger: 'blur' },
          { validator: checkCall, trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPass, trigger: 'blur'}
        ],
        passcode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '长度应为4个字符', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
    this.loadStyle();
  },
  methods: {
    loadStyle() {
      var dom = document.createElement('script');
      dom.id = 'canvas-nest';
      dom.type = 'text/javascript';
      dom.src = '../static/canvas-nest.min.js';
      dom.zIndex = "-2";
      dom.count = '100';
      document.body.append(dom);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  destroyed() {
    // var del = document.getElementById('canvas-nest');
    // var other = document.getElementsByTagName('script');
    // console.log(123, other, del,    other.parentNode);
    // other.removeChild(del);
  }
}
</script>
<style lang="scss">
.login {
  width: 100%;
  height: 100vh;
  position: relative;
  color: #808595;
}

.login-image {
  height: 100vh;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}

.login-box {
  width: 400px;
  min-height: 580px;
  margin: 0 auto;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transform: translateY(60px);
  padding: 30px 0 0 0;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
  .login-title {
    font-size: 20px;
    text-align: center;
    padding-bottom: 10px;
    position: relative;
    p {
      position: absolute;
      right: 20px;
      bottom: 10px;
      font-size: 12px;
      a {
        color: #ff9800;
      }
    }
  }
}

.el-form {
  .el-form-item__label {
    text-align: left;
    padding: 0 0 0 20px;
  }
  .el-form-item__content {
    .el-input__inner {
      width: calc(100% - 20px);
    }
    .el-input__inner:focus {
      border-color: #ff9800;
    }
    
  }
  .pass-code {
    .el-form-item__content {
      display: flex;
      .el-input__inner {
        width: calc(50%);
        margin-right: 10px;
      }
      .code-image {
        width: calc(45%);
      }
    }
  }
}

.login-btn {
  .el-form-item__content {
    margin: 0 auto !important;
    .el-button {
      border: none;
      cursor: pointer;
      width: calc(100% - 40px);
      height: 40px;
      background-color: #ff9800;
      border-radius: 5px;
      margin: 0 auto;
      display: block;
    }
  }
}
.login-line {
  text-align: center;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 30px;
    right: 30px;
    display: block;
    height: 1px;
    background: #808595;
    z-index: -1;
  }
  p {
    width: 100px;
    margin: 0 auto;

    background: #fff;
  }
}
.other-login {
  display: flex;
  justify-content: center;
  margin: 10px 0;
  .icon:first-child {
    margin-right: 10px;
  }
}

.bottom-image {
  img {
    width: 100%;
  }
}
</style>