<template>
  <div class="swiper">
    <div class="swiper-item" v-for="(item, index) in swiperInfo.filelist" :key="item.url" :ref="index">
      <img :src="item" alt="" srcset="" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    site: {
      type: String
    }
  },
  data() {
    return {
      swiperIndex: 0,
      swiperInfo: {
        filelist:[
          "../static/images/57ece79847ae9ba02d62a92b39685cfc.jpg",
          "../static/images/src=http___cn.best-wallpaper.net_wallpaper_1366x768_1609_Italy-Ravello-blue-sea-boat-mountains-trees_1366x768.jpg&refer=http___cn.best-wallpaper.webp",
          "../static/images/src=http___cn.best-wallpaper.net_wallpaper_1920x1080_1410_Nature-landscape-sea-island-trees-green-sky-clouds_1920x1080.jpg&refer=http___cn.best-wallpaper.webp",
          "../static/images/src=http___img-baofun.zhhainiao.com_fs_9c496c76d67ba31e96a9e1e771d672e0.jpg&refer=http___img-baofun.zhhainiao.png",
          "../static/images/7a128281d3833d3f79b858d7c36bed36.jpeg",
          "../static/images/src=http___pic1.win4000.com_wallpaper_7_5767ba6e2dc08.jpg&refer=http___pic1.win4000.webp",
          "../static/images/src=http___pic1.win4000.com_wallpaper_7_58146e5a0c05d.jpg&refer=http___pic1.win4000.webp",
        ],
        isswitch: true,
        switchtime: 3
      }
    }
  },
  watch: {
    site(val) {
      // this.getbannerInfo(val)
    }
  },
  mounted(){
    this.initSwiper(this.swiperInfo.isswitch, this.swiperInfo.switchtime)
  },
  methods: {
    getbannerInfo (val) {
      api.getbannerInfo({ site: val, userid: this.$store.getters.getuserId }).then(res => {
        if (res && res.code == 0) {
          this.swiperInfo = res.data;
          this.swiperInfo.filelist = JSON.parse(res.data.filelist);
          this.initSwiper(this.swiperInfo.isswitch, this.swiperInfo.switchtime)
        }
      });
    },
    initSwiper (rotation, interval) {
      let _this = this;
      let swiperEle = document.querySelectorAll(".swiper-item");
      let len = swiperEle.length;
      let timer = null;
      if(!rotation || this.swiperInfo.filelist.length == 1) return;
      clearInterval(timer);
      timer = setInterval(function () {
        _this.swiperIndex++;
        if (len === _this.swiperIndex) _this.swiperIndex = 0;
        for (let i of swiperEle) {
          i.style.opacity = 0;
        }
        swiperEle[_this.swiperIndex].style.opacity = 1;
      }, interval * 1000);
    },
  }
}
</script>
<style lang="scss">
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
</style>