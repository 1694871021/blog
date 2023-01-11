
<template>
  <div>
    <nav ref="navs">
      <div class="nav-left">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="首页" name="home">首页</el-tab-pane>
          <el-tab-pane label="新闻" name="news">新闻</el-tab-pane>
          <el-tab-pane label="心情" name="mood">心情</el-tab-pane>
          <el-tab-pane label="回忆录" name="memoir">回忆录</el-tab-pane>
          <el-tab-pane label="平时积累案例" name="case">平时积累案例</el-tab-pane>
        </el-tabs>
      </div>
      <div class="nav-right">
        <a href="#" @click="setTheme('light')">白色主题</a>
        <a href="#" @click="setTheme('dark')">黑色主题</a>
        <div v-if="islogin" class="nav-right-avatar">
          <span>你好，{{ userInfo.username }}</span>
          <el-dropdown>
            <el-avatar shape="circle" size="large" :src="userInfo.avatar"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>消息</el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/admin">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item @click="signOut" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span v-else>
          <router-link to="/login" >登录</router-link>
          <a href="#">|</a>
          <router-link to="/register">注册</router-link>
        </span>
      </div>
    </nav>
    <header>
       <banner :site="site"></banner>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import api from '../utils/api';
import { setToken, getToken, removeToken} from '../utils/auth'
import banner from '../template/banner.vue'
export default {
  components: {
    banner
  },
  data() {
    return {
      theme: "light",
      islogin: false,
      userInfo: {},
      site: 'index',
      activeName: 'home'
    };
  },
  created() {
    this.initTheme();
  },
  mounted() {
    this.getUser();
    
    window.addEventListener("scroll", this.fixedNav);
    
    window.addEventListener('hashchange',() => {
      console.log('hash变化');
    },false);
  },
  methods: {
    handleClick(e) {
      this.$router.push({path: e.name})
      this.site = e.name;
    },
    initTheme () {
      let theme = localStorage.getItem("theme") || this.theme;
      let element = document.createElement("link");
      element.setAttribute("id", "theme");
      element.setAttribute("rel", "stylesheet");
      element.setAttribute("href", "../static/css/" + theme + ".css");
      document.head.appendChild(element);
    },
    setTheme (theme) {
      var element = document.getElementById("theme") || "";
      if (element) {
        element.setAttribute("href", "../static/css/" + theme + ".css");
      } else {
        element = document.createElement("link");
        element.setAttribute("id", "theme");
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("href", "../static/css/" + theme + ".css");  
        document.head.appendChild(element);
      }
      localStorage.setItem("theme", theme);
    },
    getUser() {
      if(this.$store.state.userInfo.userid) {
        this.userInfo = this.$store.state.userInfo;
        this.islogin = true;
      } else if (getToken('$userid')){
        this.$store.commit('setuserInfo', {username: getToken('$username'), avatar: getToken('$avatar'), userid: getToken('$userid')});
        this.userInfo = this.$store.state.userInfo;
        this.islogin = true;
      }
    },
    fixedNav (e) {
      let sceollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (sceollTop > 60) {
        this.$refs.navs.setAttribute( "style","background:white");
      } else {
        this.$refs.navs.setAttribute("style", "background:transparent");
      }
    },
    signOut() {
      removeToken('$username');
      removeToken('$avatar');
      removeToken('$userid');
      window.location.href= '/'
      this.$router.push({path: '/'});
    }
  },
};
</script>
<style lang="scss">
nav {
  width: calc(100% - 320px);
  height: 60px;
  padding: 0 160px;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 1.5s;
  .nav-left {
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__nav-wrap:after {
      height: 0;
    }
    .el-tabs__content {
      display: none;
    }
    .el-tabs__active-bar {
      height: 1px;
    }
    .el-tabs__item {
      height: 60px;
      line-height: 60px;
    }
  }
  a {
    color: var(--nav-color);
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  .nav-right {
    display: flex;
    align-items: center;
    .nav-right-avatar {
      display: flex;
      align-items: center;
      >span {
        color: #f38b2a;
        margin: 5px;
      }
    }
  }
}
header {
  width: 100%;
}
main {
  width: 100%;
  background: var(--main-bg);
  min-height: 400px;
  .main {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    display: flex;
    .main-left {
      width: 70%;
      margin-right: 15px;
    }
    .main-right {
      width: 30%;
    }
  }
  .card {
    margin-bottom: 20px;
    background: #fff;
    border-radius: 6px;
    .title {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;
      padding: 20px 20px 10px 20px;
      .select-type {
        span {
          font-size: 13px;
          font-weight: bold;
          margin-left: 5px;
        }
      }
    }
    .content {
      padding: 20px;
    }
    .biaoqian {
      position: relative;
      ul {
        height: 100px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        @keyframes identifier {
          0% {
            top: 0;
            left: 0;
          }
          25% {
            top: 0;
            left: calc(100% - 20px);
          }
          50% {
            top: calc(100% - 20px);
            left: calc(100% - 20px);
          }
          75% {
            top: calc(100% - 20px);
            left: 0;
          }
          100% {
            top: 0;
            left: 0;
          }
        }
        li {
          width: 33.3%;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          &:nth-child(6n + 1), &:nth-child(6n + 2), &:nth-child(6n + 3) {
            background: #f5f5f5;
          };
          &:nth-child(3n + 4), &:nth-child(3n + 5) {
            border-right: 1px solid #eee;
          }
        }
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 20px;
          height: 20px;
          content: "";
          background: #f38b2a;
          animation: identifier 5s infinite;
        }
      }
    }
  }
}
.avatar-popper {
  cursor: pointer;
}
.avatar-popper.el-popover {
  width: 80px !important;
  min-width: 80px;
}
.avatar-popper ul li {
  border-bottom: 1px solid #eee;
  line-height: 30px;
  text-align: center;
  &:last-child {
    border-bottom: none
  }
}
</style>