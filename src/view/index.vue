
<template>
  <div>
    <nav ref="navs">
      <div class="nav-left">
        <a href="">首页</a>
        <a href="">新闻</a>
        <a href="">心情</a>
        <a href="">回忆录</a>
        <a href="">平时积累案例</a>
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
      <div class="swiper">
        <div class="swiper-item" v-for="(item, index) in swiperImg" :key="item" :ref="index">
          <img :src="item" alt="" srcset="" />
        </div>
      </div>
    </header>
    <main>
      <div class="main">
        <div class="main-left">
          <div class="card" style="margin-bottom: 0; border-radius: 6px 6px 0 0;">
            <div class="title">
              <h3>精选文章</h3>
              <div class="select-type">
                <span>前端</span>
                <span>后端</span>
              </div>
            </div>
          </div>
          <items v-for="(item) in list" :key="item.articleId" :item="item">
          </items>
          <div class="card wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
            <div class="title">
              <h3>进入热搜</h3>
              <div>
                <a href="">更多</a>
              </div>
            </div>
            <div class="content">
              内容区域
            </div>
          </div>
          <div class="card wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
            <div class="title">
              <h3>博客文章</h3>
              <div>
                <a href="">更多</a>
              </div>
            </div>
            <div class="content">
              内容区域
            </div>
          </div>
        </div>
        <div class="main-right">
          <div  class="card wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
            <div class="title">
              <h3>独家广告</h3>
              <div>
                <a href="">申请</a>
              </div>
            </div>
            <div class="content">
              内容区域
            </div>
          </div>
          <div  class="card wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
            <div class="title">
              <h3>标签云</h3>
            </div>
            <div class="content biaoqian">
              <ul>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import api from '../utils/api';
import { setToken, getToken, removeToken} from '../utils/auth'
import Items from '../template/item.vue'
export default {
  components: {
    Items
  },
  data() {
    return {
      theme: "light",
      swiperImg: [
        "../static/images/57ece79847ae9ba02d62a92b39685cfc.jpg",
        "../static/images/src=http___cn.best-wallpaper.net_wallpaper_1366x768_1609_Italy-Ravello-blue-sea-boat-mountains-trees_1366x768.jpg&refer=http___cn.best-wallpaper.webp",
        "../static/images/src=http___cn.best-wallpaper.net_wallpaper_1920x1080_1410_Nature-landscape-sea-island-trees-green-sky-clouds_1920x1080.jpg&refer=http___cn.best-wallpaper.webp",
        "../static/images/src=http___img-baofun.zhhainiao.com_fs_9c496c76d67ba31e96a9e1e771d672e0.jpg&refer=http___img-baofun.zhhainiao.png",
        "../static/images/7a128281d3833d3f79b858d7c36bed36.jpeg",
        "../static/images/src=http___pic1.win4000.com_wallpaper_7_5767ba6e2dc08.jpg&refer=http___pic1.win4000.webp",
        "../static/images/src=http___pic1.win4000.com_wallpaper_7_58146e5a0c05d.jpg&refer=http___pic1.win4000.webp",
      ],
      swiperIndex: 0,
      list: [],
      islogin: false,
      userInfo: {}
    };
  },
  created() {
    this.initTheme();
  },
  mounted() {
    this.initSwiper();
    this.getList();
    this.getUser();
    
    window.addEventListener("scroll", this.fixedNav);
  },
  methods: {
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
        console.log(1111111111111, this.$store.state.userInfo)
      } else if (getToken('$userid')){
        this.$store.commit('setuserInfo', {username: getToken('$username'), avatar: getToken('$avatar'), userid: getToken('$userid')});
        this.userInfo = this.$store.state.userInfo;
        this.islogin = true;
      }
    },
    initSwiper () {
      let _this = this;
      let swiperEle = document.querySelectorAll(".swiper-item");
      let len = swiperEle.length;
      let timer = null;
      clearInterval(timer);
      timer = setInterval(function () {
        _this.swiperIndex++;
        if (len === _this.swiperIndex) _this.swiperIndex = 0;
        for (let i of swiperEle) {
          i.style.opacity = 0;
        }
        swiperEle[_this.swiperIndex].style.opacity = 1;
      }, 3000);
    },
    getList(){
      var _this = this;
      let params = { 
        // page: this.currentPage,
        // pagesize: 10
      };
      api.getRecommendList(params).then((res) => {
        if (res && res.code == 0) {
          this.list = res.data;
          this.$nextTick(() => {
            this.$wow.init()
          });
        }
      });
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
  width: calc(100% - 240px);
  height: 60px;
  padding: 0 120px;
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
  .swiper {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    .swiper-item {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      overflow: hidden;
      transition: all 1.5s;
      opacity: 0;
      img {
        width: calc(100%);
      }
      &:first-child{
        opacity: 1;
      }
    }
  }
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