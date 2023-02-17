<template>
  <div class="swiper">
    <div v-if="swiperInfo.filelist.length">
      <div class="swiper-item" v-for="(item, index) in swiperInfo.filelist" :key="item.url" :ref="index">
        <img :src="item.url" alt="" srcset="" />
      </div>
    </div>
    <div class="swiper-item" v-else>
      <img src="../assets/images/src=http___img-baofun.zhhainiao.com_fs_9c496c76d67ba31e96a9e1e771d672e0.jpg&refer=http___img-baofun.zhhainiao.png" alt="" srcset="" />
    </div>
  </div>
</template>
<script>
import api from '@/utils/api';
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
        filelist:[],
        isswitch: true,
        switchtime: 3
      }
    }
  },
  watch: {
    '$route': 'init'
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
      var site = this.$route.path.replace('/', '');
      this.getbannerInfo(site)
    },
    getbannerInfo (site) {
      var t = this;
      api.getbannerInfo({ site: site, userid: this.$store.getters.getuserId || '13th01e65o9s0'}).then(res => {
        if (res && res.code == 0 && res.data.length) {
          t.swiperInfo = res.data[0];
          t.swiperInfo.filelist = JSON.parse(res.data[0].filelist);
          t.$nextTick(function(){
            t.initSwiper(t.swiperInfo.isswitch, t.swiperInfo.switchtime)
          })
        }
      });
    },
    initSwiper (rotation, interval) {
      let _this = this;
      let swiperEle = document.querySelectorAll(".swiper-item");
      let len = swiperEle.length;
      let timer = null;
      if(!JSON.parse(rotation) || this.swiperInfo.filelist.length <= 1) return;
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