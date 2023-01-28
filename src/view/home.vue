<template>
  <div class="main">
    <div class="main-left">
      <div class="card wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
        <div class="card-title">
          <h3>进入热搜</h3>
          <div>
            <a href="">更多</a>
          </div>
        </div>
        <div class="card-content">
          内容区域
        </div>
      </div>
      <div class="card" style="margin-bottom: 0; border-radius: 6px 6px 0 0;">
        <div class="card-title">
          <h3>最近文章</h3>
          <div class="select-type">
            <span>前端</span>
            <span>后端</span>
          </div>
        </div>
      </div>
      <items v-for="(item) in list" :key="item.articleId" :item="item"></items>
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="pageChange" @prev-click="pageChange" @next-click="pageChange" style="text-align:center" v-if="!total.length">
      </el-pagination>
    </div>
    <div class="main-right">
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
          <h3>时间预告</h3>
          <div>
          </div>
        </div>
        <div class="card-content">
          <div class="festival-left">
            <!-- <h2>下班还有</h2>
            <h2 class="time-nowork">02:00:28</h2> -->
            <el-statistic class="time-nowork" ref="statistic" @finish="hilarity" format="HH:mm:ss" :value="time1" title="离下班还有" time-indices > </el-statistic>
            <ul class="clearfix">
              <li>
                <p>发薪</p>
                <p>{{ time2 }}</p>
                <p>天</p>
              </li>
              <li>
                <p>{{ week }}</p>
                <p>{{ time3 }}</p>
                <p>天</p>
              </li>
              <li>
                <p class="d-elip" style="text-overflow: inherit;">{{ festivals }}</p>
                <p>
                  <el-statistic class="time-festivals" ref="statistic1" format="DD" :value="time4" title="" time-indices > </el-statistic>
                </p>
                <p>天</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div  class="card wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
        <div class="card-title">
          <h3>标签云</h3>
        </div>
        <div class="card-content biaoqian">
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
<!-- 天气插件 <script src="https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0"></script> -->
<script>
import items from '../template/item.vue'
import api from '../utils/api';
export default {
  components: {
    items
  },
  data() {
    var time2 = function() {
      var t = new Date();
      var t1 = new Date(t.getFullYear(), t.getMonth() + 1 ,0).getDate();
      // 发工资定为每个月10号
      if(t.getDate() > 10) {
        return t1 + 10 - t.getDate();
      } else {
        return 10 - t1;
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
          case 7:
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
      time3: new Date().getDay(),
      time4: Date.now() + (new Date('2023-06-05') - Date.now()),
      week: time3(),
      festivals: ''
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
    var s = document.createElement('script')
    s.src = '../static/js/he-standard.js'
    var sn = document.getElementsByTagName('script')[0]
    sn.parentNode.insertBefore(c, sn)
    sn.parentNode.insertBefore(s, sn)
    this.getList();
    this.getFestivals()
  },
  methods: {
    getList(){
      api.getRecommendList({page: this.currentPage, pagesize: 10}).then((res) => {
        if (res && res.code == 0) {
          this.list = res.data;
          this.total = res.total;
          this.$nextTick(() => {
            this.$wow.init()
          });
        }
      });
    },
    pageChange(e) {
      this.currentPage = e;
      this.getList();
    },
    getFestivals() {
      api.getFestivals().then((res) => {
        console.log(111, res)
        if (res && res.code == 0) {
          
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
    padding:6px 14px;;
    text-align: center;
    float: left;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    
  }
}
.time-nowork {
  text-align: center;
  margin: 0 0 10px 0;
  color: #666;
  .title {
    font-size: 26px;
  }
  .con .number {
    font-size: 26px;
  }
}
.time-festivals {
  .con .number {
    color: #666666cf;
    font-size: 12px;
    padding: 0;
  }
}
</style>