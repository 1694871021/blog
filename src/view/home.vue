<template>
  <div class="main">
    <div class="main-left">
      <div class="card wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
        <div class="card-title">
          <h3>即时热点</h3>
          <div>
            <router-link :to="{path: '/news'}">更多</router-link>
          </div>
        </div>
        <div class="card-content">
          <ul>
            <li class="new-item" v-for="(item) in newList" :key="item.id">
              <p>
                <span class="index">{{ item.realpos }}</span>
                <a :href="item.url" target="_blank">{{ item.word }}</a>
              </p>
              <p>{{ item.num }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="card" style="margin-bottom: 0; border-radius: 6px 6px 0 0;">
        <div class="card-title">
          <h3>最近文章</h3>
          <tab :tabs="['前端', '后端', '其他']" tabItem='' :horizontal="horizontal" @tabChange="tabChange"></tab>
        </div>
      </div>
      <items v-for="(item) in list" :key="item.articleId" :item="item"></items>
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="pageChange" @prev-click="pageChange" @next-click="pageChange" style="text-align:center" v-if="total">
      </el-pagination>
    </div>
    <div class="main-right">
      <div  class="card wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
        <div class="card-title">
          <h3>节日预告</h3>
          <div>
          </div>
        </div>
        <div class="card-content clearfix">
          <div class="festival-left fl">
            <el-statistic class="time-nowork" ref="statistic" @finish="hilarity" format="HH:mm:ss" :value="time1" title="离下班还有" time-indices > </el-statistic>
            <ul class="clearfix">
              <li title="每月10号发工资">
                <p>发薪</p>
                <p>{{ time2 }}</p>
                <p>天</p>
              </li>
              <li>
                <p>{{ week }}</p>
                <p>{{ time3 }}</p>
                <p>天</p>
              </li>
              <li :title="festivalsTip">
                <p class="d-elip" style="text-overflow: inherit;">{{ festivals }}</p>
                <p>
                  <el-statistic class="time-festivals" ref="statistic1" format="DD" @finish="hilarity1" :value="time4" title="" time-indices > </el-statistic>
                </p>
                <p>天</p>
              </li>
            </ul>
          </div>
          <div class="festival-right fl">
            <img src="../assets/images/adc1b2e19d514c8a5923d555b754d892.jpg" alt="">
          </div>
        </div>
      </div>
      <div  class="card wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
        <div class="card-title">
          <h3>天气预告</h3>
          <div>
          </div>
        </div>
        <div class="card-content">
          <div  id="he-plugin-standard"></div>
        </div>
      </div>
      <div  class="card wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
        <div class="card-title">
          <h3>标签云</h3>
        </div>
        <div class="card-content biaoqian">
          <ul>
            <li>Html</li>
            <li>Css</li>
            <li>Javascript</li>
            <li>Vue</li>
            <li>Node</li>
            <li>Elementui</li>
            <li>小程序</li>
            <li>项目部署</li>
            <li>环境安装</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>
<!-- 天气插件创建 https://widget.qweather.com/ -->
<!-- 天气插件 <script src="https://widget.qweather.net/standard/assets/js/he-standard-common.js?v=2.0"></script> -->
<script>
import items from '../template/item.vue'
import tab from '../template/tab.vue'
import api from '../utils/api';
import moment from 'moment';
var Inter;
export default {
  components: {
    items,
    tab
  },
  data() {
    var time2 = function() {
      var t = new Date();
      var t1 = new Date(t.getFullYear(), t.getMonth() + 1 ,0).getDate();
      // 发工资定为每个月10号
      if(t.getDate() > 10) {
        return t1 + 10 - t.getDate();
      } else {
        return 10 - t.getDate();
      }
    }
    var time3 = function() {
      var t2 = new Date().getDay();
      var week = ''
      switch (t2) {
        case 1:
          week = '周一'
          break;
        case 2:
          week = '周二'
          break;
          case 3:
          week = '周三'
          break;
          case 4:
          week = '周四'
          break;
          case 5:
          week = '周五'
          break;
          case 6:
          week = '周六'
          break;
          case 0:
          week = '周日'
          
          break;
        default:
          break;
      }
      return week
    }
    return {
      list: [],
      total: 1000,
      currentPage: 1,
      time1: Date.now() + (new Date().setHours(17,59,59)-Date.now()),
      time2: time2(),
      time3: new Date().getDay() || 7,
      time4: Date.now() + (new Date('2023-06-05') - Date.now()),
      week: time3(),
      festivals: '',
      festivalsTip: '',
      newList: [
      {"realpos":1,"num":2999341,"word":"桑姓艺人在宣传现场被强制执行","time":"2023-02-20 10:00:27","url":"https://s.weibo.com/weibo?q=桑姓艺人在宣传现场被强制执行"},
      {"realpos":2,"num":2661626,"word":"新冠","time":"2023-02-20 10:52:27","url":"https://s.weibo.com/weibo?q=新冠"},
      {"realpos":3,"num":1988915,"word":"写意中国探寻汉字起源","time":"2023-02-20 11:03:27","url":"https://s.weibo.com/weibo?q=写意中国探寻汉字起源"}
      ],

      counTime: "00:00:00",
      horizontal: true,
      type: ''
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
    c.href = require('../assets/css/he-standard.css');
    var s = document.createElement('script')
    s.src = require('../assets/js/he-standard.js')
    var sn = document.getElementsByTagName('script')[0]
    sn.parentNode.insertBefore(c, sn)
    sn.parentNode.insertBefore(s, sn)
    this.getList();
    this.getFestivals();
    // this.getnewList();
    // 倒计时 YYYY-MM-DD hh:mm:ss
    // var _this = this;
    // Inter  = setInterval(function(){ //设置定时器
    //   _this.timeArray(_this.endTime)
    // },1000)
    // _this.timeArray('2023-01-31')
  },
  methods: {
    timeArray(time){
      let that = this;
      let diff = moment(time, 'YYYY-MM-DD hh:mm:ss').diff(moment(), "seconds"); //对比两个时间差距，获得相差的秒数
      if (diff <= 0) { //如果两个时间没有差距
          clearInterval(Inter) //清除定时器
          that.counTime = "00:00:00"
          return "00:00:00";
      }
      
      let days = parseInt(diff / (3600 * 24)); //根据获得的秒数计算有多少天
      diff = diff - days * 3600 * 24;
      let hour = parseInt(diff / 3600); //根据获得的秒数计算有多少小时
      diff = diff - hour * 3600;
      let minute = parseInt(diff / 60); //根据获得的秒数计算有多少分钟
      let second = diff - 60 * minute;
      
      if (days < 10) {
          days = "0" + days;
      }
      
      if (hour < 10) {
          hour = "0" + hour;
      }
      
      if (minute < 10) {
          minute = "0" + minute;
      }
      
      if (second < 10) {
          second = "0" + second;
      }
      
      if (days == '00') {
          that.counTime = hour + ":" + minute + ":" + second
      } else {
          that.counTime = days + "天 " + hour + ":" + minute + ":" + second
      }
    },
    getList(){
      api.getRecommendList({page: this.currentPage, pagesize: 10, type: this.type}).then((res) => {
        if (res && res.code == 0) {
          this.list = res.data;
          this.total = res.total;
          this.$nextTick(() => {
            // this.$wow.init()
          });
        }
      });
    },
    getnewList() {
      this.newList = this.newList.splice(0, 3);
      // api.getnewList().then((res)=>{
      //   if(res && res.code == 200) {
      //     this.newList = res.data.splice(0, 3);
      //   }
      // })
    },
    pageChange(e) {
      this.currentPage = e;
      this.getList();
    },
    getFestivals() {
      let date = new Date();
      let year = date.getFullYear();
      let nowtime = date.getTime();
      api.getFestivals({key: '7e78d6ba1d8af5438c42d2f3ffcbb366', type: 1, date: year}).then((res) => {
        if (res && res.code == 200) {
          let list = res.result.list
          list.forEach((element, index) => {
            if(nowtime < new Date(element.wage.split('|')[0]).getTime()) {
              if(list[index - 1] &&  nowtime > new Date(list[index - 1].wage.split('|')[0])) {
                this.time4 = Date.now() + (new Date(element.wage.split('|')[0]) - Date.now()) + 24*60*60*1000;
                this.festivals = element.name;
                this.festivalsTip = element.tip;
                if(new Date(element.wage.split('|')[0]) - Date.now() < 0) {
                  this.hilarity1()
                }
              }
            }
          });
        }
      });
    },
    hilarity() {
      this.$notify({
        title: '提示',
        message: '时间已到，还不下班吗？',
        duration: 0
      });
    },
    hilarity1() {
      this.$notify({
        title: '提示',
        message: '假期到了，不休息吗？',
        duration: 0
      });
    },
    tabChange(e) {
      this.type = e;
      this.currentPage = 1;
      this.getList()
    }
  }
}

</script>
<style lang="scss">
#he-plugin-standard {
  background-size: 100% !important;
}
.main {
  width: 1200px;
  margin: 0 auto;
  padding: 20px 0 0 0;
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
  margin-bottom: 15px;
  background: #fff;
  border-radius: 6px;
  .card-title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
    padding: 20px 20px 10px 20px;
    a {
      transition: all 0.3s;
      &:hover {
        color: #409EFF;
      }
    }
    .select-type {
      span {
        font-size: 13px;
        font-weight: bold;
        margin-left: 5px;
      }
    }
  }
  .card-content {
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
        cursor: pointer;
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
        background: #409EFF;
        animation: identifier 5s infinite;
      }
    }
  }
}
.festival-left {
  width: 60%;
  color:#666666cf;
  h2 {
    letter-spacing: 2px;
    font-weight: 500;
  }
  ul>li{
    height: 60px;
    border-radius:6px;
    margin-right:6px;
    background-color:#6666661f;
    font-size: 13px;
    padding:6px 12px;;
    text-align: center;
    cursor: pointer;
    float: left;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    &:last-child {
      margin-right: 0;
    }
  }
}

.festival-right {
  width: 40%;
  img {
    width: 100%;
  }
}

.time-nowork {
  text-align: center;
  margin: 0 0 10px 0 !important;
  color: #666 !important;
  .title {
    font-size: 26px;
  }
  >.con>.number {
    font-size: 26px !important;
  }
}

.time-festivals {
  .con {
    .number {
      color: #666666cf !important;
      font-size: 13px !important;
      padding: 0;
    }
  }
  
}

.new-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  .index {
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
    border-radius: 5px;
    color: #333;
    background-color: var(--bg_darken);
    margin-right: 20px;
  }
  a {
    transition: all 0.3s;
  }
  a:hover {
    color: #409EFF;
  }
  &:nth-child(1) {
    .index {
      background: #fe2d46;
      color: #fff;
    }
  }
  &:nth-child(2) {
    .index {
      background: #ff6600;
      color: #fff;
    }
  }
  &:nth-child(3) {
    .index {
      background: #faa90e;
      color: #fff;
    }
  }
  
}
</style>