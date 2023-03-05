<template>
  <div class="new">
    <div class="new-left">
      <el-tabs :tab-position="tabPosition" style="height: auto" @tab-click="handleClick">
        <el-tab-pane label="weibo">
          <p slot="label" >
            <svg class="icon" aria-hidden="true" style="background: #efdb91; border-radius: 50%">
              <use xlink:href="#icon-weibo"></use>
            </svg>
            <span>  微博</span>
          </p>
        </el-tab-pane>
        <el-tab-pane label="weixin">
          <p slot="label" >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-weixinmw"></use>
            </svg>
            <span>  微信</span>
          </p>
        </el-tab-pane>
        <el-tab-pane label="zhihu">
          <p slot="label" >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shejiaotubiao-46"></use>
            </svg>
            <span>  知乎</span>
          </p>
        </el-tab-pane>
        <el-tab-pane label="douyin">
          <p slot="label" >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pinpaibiaoshi_douyin"></use>
            </svg>
            <span>  抖音</span>
          </p>
        </el-tab-pane>
        <el-tab-pane label="bilibili">
          <p slot="label" >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bilibili"></use>
            </svg>
            <span>  哔哩哔哩</span>
          </p>
        </el-tab-pane>

      </el-tabs>
    </div>
    <div class="new-right">
      <div class="title" v-if="type == 'weibo'">
        <svg class="icon" aria-hidden="true" style="background: #efdb91; border-radius: 50%">
            <use xlink:href="#icon-weibo"></use>
        </svg>
        微博 . 热搜榜
      </div>
      <div class="title" v-else-if="type == 'weixin'">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-weixinmw"></use>
        </svg>
        微信 . 热搜榜
      </div>
      <div class="title" v-else-if="type == 'zhihu'">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shejiaotubiao-46"></use>
        </svg>
        知乎 . 热搜榜
      </div>
      <div class="title" v-else-if="type == 'douyin'">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pinpaibiaoshi_douyin"></use>
        </svg>
        抖音 . 热搜榜
      </div>
      <div class="title" v-else-if="type == 'bilibili'">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bilibili"></use>
        </svg>
        哔哩哔哩 . 热搜榜
      </div>
      <ul>
        <li class="new-item" v-for="(item, index) in newList" :key="item.id">
          <!-- <p>
            <span class="index">{{ item.realpos }}</span>
            <a :href="item.url" target="_blank">{{ item.word }}</a>
          </p>
          <p v-if="item.num < 10000">
            {{ num }}
          </p>
          <p v-if="item.num >= 10000">
            {{ (item.num / 10000).toFixed(2) }}万
          </p> -->
          <p>
            <span class="index">{{ index + 1 }}</span>
            <a :href="item.url" target="_blank">{{ item.name }}</a>
          </p>
          <p>{{ item.viewnum }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import api from '../utils/api';
export default {
  data(){
    return {
      newList:[],
      tabPosition: 'left',
      hotsearchTitle: '微信',
      hotsearchIcon: `<use xlink:href="#icon-weixinmw"></use>`,
      type: 'weibo'
    }
  },
  mounted() {
    this.getnewList()
  },
  methods: {
    handleClick(tab, event) {
      this.type = tab.label;
      this.getnewList();
    },
    getnewList() {
      api.getnewList({key: 'jvOvNCdDe2IguxAfv0P9c1ftnC', type: this.type}).then((res)=>{
        if(res && res.code == 200) {
          this.newList = res.data;
        }
      })
    }
  }
}
</script>
<style lang="scss">
.new {
  display: flex;
  margin: 0 auto 0;
  padding-top: 20px;
  border-radius: 6px;
}

.new-left{
  width: 20%;
  background: #fff;
  font-size: 16px;
  padding: 20px 0;
  margin-bottom: 20px;
  border-radius: 6px 0 0 6px;
  border-right: 1px solid var(--bg_darken);
  .el-tabs {
    .el-tabs__nav-wrap::after {
      width: 0;
    }
  }
  .el-tabs--left .el-tabs__nav-wrap.is-left::after {
    width: 0;
  }

  .el-tabs--left .el-tabs__active-bar.is-left{
    width: 3px;
    left: 0;
    right: auto;
  }
  .el-tabs--left .el-tabs__header.is-left {
    width: 100%;
    margin-right: 0;
  }
  .el-tabs--left .el-tabs__item.is-left {
    font-size: 16px;
    padding: 0 50px;
    text-align: left;
    transition: all 0.3s;
  }
  .el-tabs--left .el-tabs__item.is-left .icon {
    font-size: 28px;
    vertical-align: middle;
  }
  .el-tabs__content {
    display: none;
  }
}

.new-right {
  width: 80%;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 0 6px 6px 0;
  background: #fff;
  .title{
    font-size: 25px;
    font-weight: 500;
    color: #333;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid var(--bg_darken);
    .icon {
      margin-right: 10px;
    }
  }
  .new-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
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
}

@media (min-width: 1200px) {
  .new {
      max-width: 1140px;
  }
}

</style>