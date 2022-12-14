
<template>
  <div>
    <nav ref="navs">
      <div class="nav-left">
        <a  href="">首页</a>
        <a href="">新闻</a>
        <a href="">心情</a>
        <a href="">关于</a>
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
        <div
          class="swiper-item"
          v-for="(item, index) in swiperImg"
          :key="item"
          :ref="index"
        >
          <img :src="item" alt="" srcset="" />
        </div>
      </div>
    </header>
    <main></main>
    <footer>
      <div class="scale-box">
        <div class="clouds"></div>
        <div class="background"></div>
        <div class="foreground"></div>
      </div>
    </footer>
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
}

footer {
  position: absolute;
  left: 0;
  right: 0;
  padding: 15px 0;
  font-size: 12px;
  line-height: 1.5;
  background: var(--footer-bg);
  .scale-box {
    bottom: 0;
    left: 0;
    height: 1.9rem;
    position: absolute;
    width: 100%;
    z-index: 1;
    transform: translate3d(0, 0, 0);
  }
  .clouds {
    background-repeat: repeat-x !important;
    background: url(https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@master/img/webp/clouds.webp)
      repeat-x;
    background-size: 225em 15em;
    position: absolute;
    top: -2em;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .background {
    background-repeat: repeat-x !important;
    background: url(https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@master/img/webp/background.webp)
      repeat-x;
    background-size: 225em 21.313em;
    position: absolute;
    top: -1em;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .foreground {
    background-repeat: repeat-x !important;
    background: url(https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@master/img/webp/foreground.webp)
      repeat-x;
    background-size: 225em 15em;
    position: absolute;
    top: 0.1rem;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>