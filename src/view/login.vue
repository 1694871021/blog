<template>
  <div class="login">
    <div class="login-box">
      <div class="login-title">
        登录
        <p>
          没有账号？
          <router-link to="/register">去注册 </router-link>
        </p>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="" prop="email" label-width="20px">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱号"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password" label-width="20px">
          <el-input v-model="ruleForm.password"  placeholder="请输入密码(字母或数字且长度大于等于6位)"></el-input>
        </el-form-item>
        <el-form-item label="" prop="code" label-width="20px" class="pass-code">
          <el-input v-model="ruleForm.code"  placeholder="请输入验证码"></el-input>
          <img :src="url + '/getCaptcha'" alt="点击获取验证码" class="code-image" ref="codeImg" @click="getCode">
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
    </div>
    <div class="roll-box1">

    </div>
    <div class="roll-box2">
      
    </div>
    <div class="roll-box3">
      
    </div>
    <div class="roll-box4">
      
    </div>
  </div>
</template>
<script>
import api, { url } from '../utils/api';
import { setToken } from '../utils/auth'
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if(reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确邮箱号'));
      }
    }
    var checkCall = (rule, value, callback) => {
      var reg = new RegExp(/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/);
      if(reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确手机号'));
      }
    }
    var checkPass = (rule, value, callback) => {
      var reg = new RegExp(/^[A-Za-z0-9]{6,}$/);
      if(reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确密码'));
      }
    }
    return {
      url: url,
      ruleForm: {
        email: '',
        password: '',
        code: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱号', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPass, trigger: 'blur'}
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '长度应为4个字符', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.verifyCaptcha(this.ruleForm).then((res)=> {
            if(res.code == 0) {
              this.$store.commit('setuserInfo', res.data);
              for(var item in res.data) {
                setToken('$' + item, res.data[item] )
              }
              this.$router.push({path: '/'});
              this.$message({
                type: "success",
                message: res.message
              });
            } else {
              this.$message({
                type: "warning",
                message: res.message
              });
            }
          })
        } else {
          this.$message({
            type: "warning",
            message: "校验失败"
          });
          return false;
        }
      });
    },
    getCode() {
      this.$refs.codeImg.setAttribute('src', url + '/getCaptcha?=t'+Date.now())
    }
  }
}
</script>
<style lang="scss">
.login {
  width: 100%;
  height: 100vh;
  position: relative;
  color: #808595;
  overflow: hidden;
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
        // margin-right: 10px;
      }
      .code-image {
        width: calc(65%);
        cursor: pointer;
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

.roll-box1 {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #615feb;
  position: absolute;
  top: 100px;
  left: 100px;
  animation-name: roll1;
  animation-duration: 20s;
  animation-iteration-count: infinite;
}
@keyframes roll1 {
  0% {
    top: 100px;
    left: 100px;
  }
  50% {
    top: 170px;
    left: 200px;
  }
  100% {
    top: 100px;
    left: 100px;
  }
}

.roll-box2 {
  width: 141px;
  height: 100px;
  border-radius: 20px;
  overflow: hidden;
  bottom: 80px;
  left: 200px;
  position: absolute;
  animation-name: roll2;
  animation-duration: 50s;
  animation-iteration-count: infinite;
  &::before {
    content: "";
    border-radius: 20px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ee675c;
    transform-origin: left bottom;
    transform: rotate(45deg);
  }
}
@keyframes roll2 {
  0% {
    bottom: 80px;
    left: 200px;
    transform: rotate(0);
  }
  50% {
    bottom: 50px;
    left: 300px;
    transform: rotate(180deg);

  }
  100% {
    bottom: 80px;
    left: 200px;
    transform: rotate(360deg);
  }
}
.roll-box3 {
  width: 300px;
  height: 170px;
  background: #fdd663;
  border-radius: 300px 300px 40px 40px;
  position: absolute;
  top: -100px;
  right: 200px;
  animation-name: roll3;
  animation-duration: 30s;
  animation-iteration-count: infinite;
  transform: rotate(0deg)
}
@keyframes roll3 {
  0% {
    top: -100px;
    right: 200px;
    transform: rotate(0deg)
  }
  25% {
    top: -150px;
    right: 250px;
    transform: rotate(10deg)
  }
  50% {
    top: 0px;
    right: 300px;
    transform: rotate(-30deg)
  }
  75% {
    top: 0px;
    right: 300px;
    transform: rotate(0deg)
  }
  90% {
    top: -30px;
    right: 250px;
    transform: rotate(-20deg)
  }
  100% {
    top: -100px;
    right: 200px;
    transform: rotate(-30deg)
  }
}
.roll-box4 {
  width: 300px;
  height: 300px;
  border-radius: 50px;
  background: #81c995;
  position: absolute;
  bottom: -100px;
  right: -100px;
  animation-name: roll4;
  animation-duration: 50s;
  animation-iteration-count: infinite;
}
@keyframes roll4 {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>