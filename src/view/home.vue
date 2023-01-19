<template>
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
      <items v-for="(item) in list" :key="item.articleId" :item="item"></items>
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
          <h3>天气预告</h3>
          <div>
          </div>
        </div>
        <div class="content">
          <div  id="he-plugin-standard"></div>
        </div>
      </div>
      <div>
        <div class="app-item-icon" title="下班倒计时">
          <div class="d-watch-resize" data-v-c8820537="" data-v-d5d5c9bf="" style="font-size: 21px;">
            <div class="hfull countdown-wrap" data-v-d5d5c9bf="" style="--bgColor:#ffffff; --bgImg:url(\#ffffff\?x-oss-process\=image\/resize\,limit_0\,m_fill\,w_400\,h_200\/quality\,q_90); --textColor:#666666; --textSubColor:#666666cf; --fontFamily:HarmonyOS_Sans; --maskBg:rgba(0,0,0,0); --fontWeight:bold; --workStatus:url(https\:\/\/files\.codelife\.cc\/itab\/widget\/countdown\/onwork\.png\?x-oss-process\=image\/resize\,limit_0\,m_fill\,w_300\,h_300\/quality\,q_100);">
              <div class="hfull wfull icon-size-2x4" data-v-d5d5c9bf="" style="color: var(--textColor);">
                <div class="icon-2x4-offwork" data-v-d5d5c9bf="">
                  <p class="title" data-v-d5d5c9bf="" style="">
                    <span data-v-d5d5c9bf="">下班还有</span>
                  </p>
                  <p class="time mt5" data-v-d5d5c9bf="" style="line-height: 1.5em; height: 1.6em;">
                    <time class="d-block hfull" data-v-d5d5c9bf="" style="font-weight: var(--fontWeight); font-size: 1.6em;">02:00:28</time>
                  </p>
                </div>
                <ul class="icon-2x4-box" data-v-d5d5c9bf="" style="height: 50%; --boxBg:#6666661f;">
                  <li data-v-d5d5c9bf="">
                    <p data-v-d5d5c9bf="">发薪</p>
                    <p class="b" data-v-d5d5c9bf="">23</p>
                    <p data-v-d5d5c9bf="">天</p>
                  </li>
                  <li data-v-d5d5c9bf="">
                    <p data-v-d5d5c9bf="">周五</p>
                    <p class="b" data-v-d5d5c9bf="">2</p>
                    <p data-v-d5d5c9bf="">天</p>
                  </li>
                  <li data-v-d5d5c9bf="">
                    <p class="d-elip" data-v-d5d5c9bf="" style="text-overflow: inherit;">除夕</p>
                    <p class="b" data-v-d5d5c9bf="">3</p><p data-v-d5d5c9bf="">天</p>
                  </li>
                </ul>
                <div class="countdown-img" data-v-d5d5c9bf="">
                </div>
              </div>
            </div>
          </div>
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
</template>
<!-- <script src="https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0"></script> -->
<script>

import items from '../template/item.vue'
import api from '../utils/api';
export default {
  components: {
    items
  },
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    window.WIDGET = {
      "CONFIG": {
        "layout": "2",
        "width": 300,
        "height": 270,
        "background": "1",
        "dataColor": "FFFFFF",
        "borderRadius": "5",
        "key": "bd30d4ebd1a14debb807f5f9d6b4e3e5"
      }
    }
    var c = document.createElement('link')
    c.rel = 'stylesheet'
    c.href = '../static/css/he-standard.css';
    // c.href = 'https://widget.qweather.net/standard/static/css/he-standard.css?v=1.4.0'
    var s = document.createElement('script')
    s.src = '../static/js/he-standard.js'
    // s.src = 'https://widget.qweather.net/standard/static/js/he-standard.js?v=1.4.0'
    var sn = document.getElementsByTagName('script')[0]
    sn.parentNode.insertBefore(c, sn)
    sn.parentNode.insertBefore(s, sn)
    this.getList();
  },
  methods: {
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
  }
}

</script>
<style>
#he-plugin-standard {
  background-size: 100% !important;
}
</style>