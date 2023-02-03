
<template>
  <div>
    <nav ref="navs">
      <div class="nav-left">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="首页" name="home">首页</el-tab-pane>
          <el-tab-pane label="新闻" name="news">新闻</el-tab-pane>
          <el-tab-pane label="心情" name="mood">心情</el-tab-pane>
          <el-tab-pane label="网站导航" name="site">网站导航</el-tab-pane>
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
    <header v-show="bannerShow">
       <banner :site="site"></banner>
    </header>
    <main>
      <router-view @onSend="onSend"></router-view>  
    </main>
    <footer>
      <bottom></bottom>
    </footer>
  </div>
</template>
<script>
import api from '../utils/api';
import { setToken, getToken, removeToken} from '../utils/auth'
import banner from '../template/banner.vue';
import bottom from '../template/bottom.vue';
export default {
  components: {
    banner,
    bottom
  },
  data() {
    return {
      theme: "light",
      islogin: false,
      userInfo: {},
      site: 'index',
      activeName: 'home',
      bannerShow: true
    };
  },
  created() {
    this.initTheme();
  },
  mounted() {
    this.getUser();
    window.addEventListener("scroll", this.fixedNav);
    window.addEventListener('hashchange',(e) => {
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
      element.setAttribute("href", require("../assets/css/" + theme + ".css"));
      document.head.appendChild(element);
    },
    setTheme (theme) {
      var element = document.getElementById("theme") || "";
      if (element) {
        element.setAttribute("href", require("../assets/css/" + theme + ".css"));
      } else {
        element = document.createElement("link");
        element.setAttribute("id", "theme");
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("href", require("../assets/css/" + theme + ".css"));  
        document.head.appendChild(element);
      }
      localStorage.setItem("theme", theme);
    },
    getUser() {
      if (getToken('$userid')) {
        api.getUserInfo({userid: getToken('$userid')}).then((res)=>{
          if(res.code == 0) {
            this.$store.commit('setuserInfo', res.data);
            this.userInfo = res.data;
            this.islogin = true;
          }
        })
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
    },
    onSend(e) {
      this.bannerShow = e;
    }
  }
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