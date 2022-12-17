
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
        <a href="">登录</a>
        <a href="">注册</a>
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
          <div class="card">
            <div class="title">
              <h4>精选文章</h4>
              <div>
                <a href="">更多</a>
              </div>
            </div>
            <div class="content">
              内容区域
            </div>
          </div>
          <div class="card">
            <div class="title">
              <h4>进入热搜</h4>
              <div>
                <a href="">更多</a>
              </div>
            </div>
            <div class="content">
              内容区域
            </div>
          </div>
          <div class="card">
            <div class="title">
              <h4>博客文章</h4>
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
          <div class="card">
            <div class="title">
              <h4>独家广告</h4>
              <div>
                <a href="">申请</a>
              </div>
            </div>
            <div class="content">
              内容区域
            </div>
          </div>
          <div class="card">
            <div class="title">
              <h4>标签云</h4>
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
export default {
  data() {
    return {
      theme: "light",
      swiperImg: [
        "../static/img/57ece79847ae9ba02d62a92b39685cfc.jpg",
        "../static/img/66d37c36bdde55b052197c0491c91dc3.jpg",
        "../static/img/d117eb2944493898dd0f24df1e21e84d.jpg",
      ],
      swiperIndex: 0,
    };
  },
  created() {
    this.initTheme();
  },
  mounted() {
    this.initSwiper();
    window.addEventListener("scroll", this.fixedNav);
  },
  methods: {
    initTheme: function () {
      let theme = localStorage.getItem("theme") || this.theme;
      let element = document.createElement("link");
      element.setAttribute("id", "theme");
      element.setAttribute("rel", "stylesheet");
      element.setAttribute("href", "../static/css/" + theme + ".css");
      document.head.appendChild(element);
    },
    setTheme: function (theme) {
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
    initSwiper: function () {
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
    fixedNav: function (e) {
      let sceollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (sceollTop > 60) {
        this.$refs.navs.setAttribute( "style","background:white");
      } else {
        this.$refs.navs.setAttribute("style", "background:transparent");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
}
header {
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
    width: 1100px;
    margin: 0 auto;
    padding: 20px 0;
    display: flex;
    .main-left {
      flex: 7;
      margin-right: 20px;
    }
    .main-right {
      flex: 3;
    }
  }
  .card {
    margin-bottom: 20px;
    background: #fff;
    .title {
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;
      padding: 20px 20px 10px 20px;
    }
    // > div {
    //   a {
    //     font-size: 14px;
    //   }
    // }
    .content {
      padding: 10px 20px 20px 20px;
    }
    .biaoqian {
      position: relative;
      ul {
        height: 100px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
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
</style>