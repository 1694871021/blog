<template>
  <div class="main">
    <div class="main-left">
      <div class="card wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
        <div class="card-title">
          <h3>即时热点</h3>
          <div>
            <a href="">更多</a>
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
<!-- 天气插件创建 https://widget.qweather.com/ -->
<!-- 天气插件 <script src="https://widget.qweather.net/standard/assets/js/he-standard-common.js?v=2.0"></script> -->
<script>
import items from '../template/item.vue'
import api from '../utils/api';
import moment from 'moment';
var Inter;
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
      newList: [{"realpos":1,"num":1939880,"word":"嗯哼长青春痘了","time":"2023-02-01 15:09:31","url":"https://s.weibo.com/weibo?q=嗯哼长青春痘了"},{"realpos":2,"num":1332495,"word":"韩国女子在驻韩美军基地被性侵","time":"2023-02-01 13:32:33","url":"https://s.weibo.com/weibo?q=韩国女子在驻韩美军基地被性侵"},{"realpos":3,"num":1320045,"word":"各地灯会直拍","time":"2023-02-01 13:47:27","url":"https://s.weibo.com/weibo?q=各地灯会直拍"},{"realpos":4,"num":1308954,"word":"情侣刚分手为何不要马上删除","time":"2023-02-01 15:01:27","url":"https://s.weibo.com/weibo?q=情侣刚分手为何不要马上删除"},{"realpos":5,"num":1200892,"word":"爱奇艺因限制投屏被起诉已立案","time":"2023-02-01 15:52:31","url":"https://s.weibo.com/weibo?q=爱奇艺因限制投屏被起诉已立案"},{"realpos":6,"num":1152199,"word":"全员加速中确认重启","time":"2023-02-01 15:58:30","url":"https://s.weibo.com/weibo?q=全员加速中确认重启"},{"realpos":7,"num":1122276,"word":"高启强有多恨高晓晨","time":"2023-02-01 15:25:30","url":"https://s.weibo.com/weibo?q=高启强有多恨高晓晨"},{"realpos":8,"num":1088692,"word":"Lisa购买75亿韩元住宅","time":"2023-02-01 14:19:30","url":"https://s.weibo.com/weibo?q=Lisa购买75亿韩元住宅"},{"realpos":9,"num":890260,"word":"高叶 浪姐4","time":"2023-02-01 12:59:36","url":"https://s.weibo.com/weibo?q=高叶 浪姐4"},{"realpos":10,"num":857328,"word":"杨洋被网友错认成女演员","time":"2023-02-01 14:43:32","url":"https://s.weibo.com/weibo?q=杨洋被网友错认成女演员"},{"realpos":11,"num":670037,"word":"女子找熟人25万装房子成精简风","time":"2023-02-01 11:06:30","url":"https://s.weibo.com/weibo?q=女子找熟人25万装房子成精简风"},{"realpos":12,"num":613250,"word":"8岁女童雪场缆车坠落大小便不能自理","time":"2023-02-01 15:37:29","url":"https://s.weibo.com/weibo?q=8岁女童雪场缆车坠落大小便不能自理"},{"realpos":13,"num":544161,"word":"伽罗新皮肤炽翼辉光","time":"2023-02-01 15:24:29","url":"https://s.weibo.com/weibo?q=伽罗新皮肤炽翼辉光"},{"realpos":14,"num":542862,"word":"鱼跃医疗被罚270万元","time":"2023-02-01 14:24:28","url":"https://s.weibo.com/weibo?q=鱼跃医疗被罚270万元"},{"realpos":15,"num":539079,"word":"邓先生 这次表现还不够完美","time":"2023-02-01 15:46:31","url":"https://s.weibo.com/weibo?q=邓先生 这次表现还不够完美"},{"realpos":16,"num":486720,"word":"无名是王一博转型电影演员的第一步","time":"2023-02-01 15:38:28","url":"https://s.weibo.com/weibo?q=无名是王一博转型电影演员的第一步"},{"realpos":17,"num":458677,"word":"男子连喝2场酒死亡6酒友赔27万","time":"2023-02-01 11:56:33","url":"https://s.weibo.com/weibo?q=男子连喝2场酒死亡6酒友赔27万"},{"realpos":18,"num":452852,"word":"周柯宇机场被小朋友问名字","time":"2023-02-01 15:54:31","url":"https://s.weibo.com/weibo?q=周柯宇机场被小朋友问名字"},{"realpos":19,"num":394142,"word":"刘强东得子后立即回国工作","time":"2023-02-01 11:10:32","url":"https://s.weibo.com/weibo?q=刘强东得子后立即回国工作"},{"realpos":20,"num":381361,"word":"流浪地球2单日票房反超满江红","time":"2023-02-01 14:28:31","url":"https://s.weibo.com/weibo?q=流浪地球2单日票房反超满江红"},{"realpos":21,"num":364679,"word":"女性分娩阵痛到底有多痛","time":"2023-02-01 15:10:31","url":"https://s.weibo.com/weibo?q=女性分娩阵痛到底有多痛"},{"realpos":22,"num":343720,"word":"吴京半年没怎么吃碳水","time":"2023-02-01 13:38:30","url":"https://s.weibo.com/weibo?q=吴京半年没怎么吃碳水"},{"realpos":23,"num":341163,"word":"龙凤胎的颜值差距有多大","time":"2023-02-01 14:05:30","url":"https://s.weibo.com/weibo?q=龙凤胎的颜值差距有多大"},{"realpos":24,"num":326600,"word":"高叶跳舞","time":"2023-02-01 14:43:32","url":"https://s.weibo.com/weibo?q=高叶跳舞"},{"realpos":25,"num":270203,"word":"陆虎体验分娩阵痛被痛哭","time":"2023-02-01 15:25:30","url":"https://s.weibo.com/weibo?q=陆虎体验分娩阵痛被痛哭"},{"realpos":26,"num":262400,"word":"高叶旧照","time":"2023-02-01 15:06:30","url":"https://s.weibo.com/weibo?q=高叶旧照"},{"realpos":27,"num":252893,"word":"沙溢拍流浪地球2一天吃六七顿","time":"2023-02-01 13:22:33","url":"https://s.weibo.com/weibo?q=沙溢拍流浪地球2一天吃六七顿"},{"realpos":28,"num":243133,"word":"网传蔡徐坤将参加米兰时装周","time":"2023-02-01 14:43:32","url":"https://s.weibo.com/weibo?q=网传蔡徐坤将参加米兰时装周"},{"realpos":29,"num":242957,"word":"狂飙大嫂海报细节","time":"2023-02-01 15:40:30","url":"https://s.weibo.com/weibo?q=狂飙大嫂海报细节"},{"realpos":30,"num":240635,"word":"夫妻连续两胎均性别难辨","time":"2023-02-01 09:48:26","url":"https://s.weibo.com/weibo?q=夫妻连续两胎均性别难辨"},{"realpos":31,"num":239323,"word":"王鹤棣白鹿背后拥抱看剧本路透","time":"2023-02-01 14:02:29","url":"https://s.weibo.com/weibo?q=王鹤棣白鹿背后拥抱看剧本路透"},{"realpos":32,"num":236070,"word":"快把猫给高启强撸","time":"2023-02-01 14:16:29","url":"https://s.weibo.com/weibo?q=快把猫给高启强撸"},{"realpos":33,"num":221948,"word":"唐嫣终于进组拍戏了","time":"2023-02-01 12:18:35","url":"https://s.weibo.com/weibo?q=唐嫣终于进组拍戏了"},{"realpos":34,"num":213481,"word":"郭帆拍流浪地球2最爱看科学家吵架","time":"2023-02-01 16:11:28","url":"https://s.weibo.com/weibo?q=郭帆拍流浪地球2最爱看科学家吵架"},{"realpos":35,"num":203974,"word":"刘强东实控企业超300家","time":"2023-02-01 14:50:31","url":"https://s.weibo.com/weibo?q=刘强东实控企业超300家"},{"realpos":36,"num":199902,"word":"没鼻梁的人有福了","time":"2023-02-01 16:18:30","url":"https://s.weibo.com/weibo?q=没鼻梁的人有福了"},{"realpos":37,"num":195427,"word":"昆山一男医生社交平台发女患者私密照","time":"2023-02-01 11:17:31","url":"https://s.weibo.com/weibo?q=昆山一男医生社交平台发女患者私密照"},{"realpos":38,"num":193880,"word":"二刷流浪地球2才看懂的细节","time":"2023-02-01 16:00:31","url":"https://s.weibo.com/weibo?q=二刷流浪地球2才看懂的细节"},{"realpos":39,"num":193726,"word":"9岁患癌男童体内取出柚子般大肿瘤","time":"2023-02-01 12:41:35","url":"https://s.weibo.com/weibo?q=9岁患癌男童体内取出柚子般大肿瘤"},{"realpos":40,"num":191027,"word":"这猫咪怎么狗模狗样的","time":"2023-02-01 16:13:32","url":"https://s.weibo.com/weibo?q=这猫咪怎么狗模狗样的"},{"realpos":41,"num":189872,"word":"张艺谋说满江红是正能量的传承","time":"2023-02-01 14:15:31","url":"https://s.weibo.com/weibo?q=张艺谋说满江红是正能量的传承"},{"realpos":42,"num":185124,"word":"小狗犯错后的表情","time":"2023-02-01 15:56:30","url":"https://s.weibo.com/weibo?q=小狗犯错后的表情"},{"realpos":43,"num":184675,"word":"1岁萌娃躺地耍赖父母转身离开","time":"2023-02-01 16:07:32","url":"https://s.weibo.com/weibo?q=1岁萌娃躺地耍赖父母转身离开"},{"realpos":44,"num":184260,"word":"韩素希车银优合体拍画报","time":"2023-02-01 14:33:31","url":"https://s.weibo.com/weibo?q=韩素希车银优合体拍画报"},{"realpos":45,"num":177966,"word":"王一博拍无名时的路透","time":"2023-02-01 15:53:32","url":"https://s.weibo.com/weibo?q=王一博拍无名时的路透"},{"realpos":46,"num":175011,"word":"隆妮说大概率是我高攀了高启兰","time":"2023-02-01 15:18:30","url":"https://s.weibo.com/weibo?q=隆妮说大概率是我高攀了高启兰"},{"realpos":47,"num":172057,"word":"麻将在东北的各种叫法","time":"2023-02-01 15:30:32","url":"https://s.weibo.com/weibo?q=麻将在东北的各种叫法"},{"realpos":48,"num":166975,"word":"赵丽颖将进组新戏","time":"2023-02-01 11:58:35","url":"https://s.weibo.com/weibo?q=赵丽颖将进组新戏"},{"realpos":49,"num":160209,"word":"雷军称喜欢并推崇任天堂","time":"2023-02-01 16:04:32","url":"https://s.weibo.com/weibo?q=雷军称喜欢并推崇任天堂"},{"realpos":50,"num":147773,"word":"关于变异株CH.1.1的六问六答","time":"2023-02-01 16:24:31","url":"https://s.weibo.com/weibo?q=关于变异株CH.1.1的六问六答"}],

      counTime: "00:00:00",
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
    this.getnewList();
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
      api.getRecommendList({page: this.currentPage, pagesize: 10}).then((res) => {
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
  margin: 0 0 10px 0;
  color: #666;
  .title {
    font-size: 26px;
  }
  >.con>.number {
    font-size: 26px !important;
  }
}

.time-festivals {
  >.con>.number {
    color: #666666cf;
    font-size: 12px;
    padding: 0;
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