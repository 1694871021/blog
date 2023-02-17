<template>
  <div class="login">
    <div class="login-box">
      <div class="login-title">
        注册
        <p>
          已有账号？
          <router-link to="/login">去登录 </router-link>
        </p> 
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="email" label-width="20px">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="code" label-width="20px" class="register-code">
          <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
          <p @click="getEmailCode">获取验证码</p>
        </el-form-item>
        <el-form-item prop="password" label-width="20px">
          <el-input v-model="ruleForm.password"  placeholder="请输入密码(字母或数字且长度大于等于6位)"></el-input>
        </el-form-item>
        <el-form-item prop="password1" label-width="20px">
          <el-input v-model="ruleForm.password1"  placeholder="请再次输入密码"></el-input>
        </el-form-item>

        <el-form-item  class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
import api from '../utils/api';
import { setToken } from '../utils/auth'
import moment from 'moment';
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
    var checkPass1 = (rule, value, callback) => {
      var reg = new RegExp(/^[A-Za-z0-9]{6,}$/);
      if(reg.test(value)) {
        if(value !== this.ruleForm.password) {
          this.password1 = '';
          callback(new Error('两次输入的密码不一致, 请重新输入'));
        }
        callback()
      } else {
        callback(new Error('请输入正确密码'));
      }
    }
    return {
      ruleForm: {
        email: '',
        code: '',
        password: '',
        password1: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱号', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur'}
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '长度应为4个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPass, trigger: 'blur'}
        ],
        password1: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: checkPass1, trigger: 'blur'}
        ],
      },
      checkEmail
    }
  },
  mounted() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = this.ruleForm;
          params.userid = Number(Math.random().toString().substr(3,6) + Date.now()).toString(36);
          params.time = moment().format('YYYY-MM-DD HH:mm:ss');
          params.avatar = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
          api.register(params).then(res => {
            if(res && res.code==0){
              this.$store.commit('setuserInfo', {email: params.email, userid: params.userid, avatar:params.avatar});
              setToken('$userid', params.userid)
              setToken('$avatar', params.avatar)
              this.$message({
                type: "success",
                message: "注册成功"
              });
              this.$router.push({path: '/'});
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getEmailCode () {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if(!this.ruleForm.email) {
        this.$message({
          type: 'warning',
          message: '邮箱不能为空'
        })
        return
      }
      this.checkEmail('', this.ruleForm.email, function(res){
        if(res) {
          this.$message({
            type: 'warning',
            message: '邮箱格式不正确'
          })
        return
        }
      })
      api.getEmailCode(this.ruleForm).then((res)=>{
        if(res.code == 0) {
          this.$message({
          type: 'success',
          message: res.message
        })
        } else {
          this.$message.error(res.message)
        }
      })
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
  .register-code {
    .el-form-item__content {
      display: flex;
      .el-input {
        width: auto;
      }
      .el-input__inner {
        margin-right: 10px;
      }
      p {
        padding: 5px 10px;
        color: #fff;
        font-size: 25px;
        line-height: 100%;
        border-radius: 6px;
        background: #808595;
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