<template>
  <div class="new">
    <div class="new-left">
      <el-tabs :tab-position="tabPosition" style="height: auto" >
        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
    <div class="new-right">
      <div class="title">123123</div>
      <ul>
        <li class="new-item" v-for="(item, index) in newList" :key="item.id">
          <p>
            <span class="index">{{ index+1 }}</span>
            <a :href="item.url" target="_blank">{{ item.title }}</a>
          </p>
          <p>
            {{ item.num }}
          </p>
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
      platformList: [
        {
          platformname: '微博',
          platformid: '',
        }        
      ],
      newList:[
        {
          title: 11111111111111111,
          num: 1111111
        },
        {
          title: 11111111111111111,
          num: 1111111
        },
        {
          title: 11111111111111111,
          num: 1111111
        }
      ],
      tabPosition: 'left'
    }
  },
  mounted() {
    api.getnewList({id: 'KqndgxeLl9'}).then((res)=>{
      if(res) {
        this.newList = res.data;
      }
    })
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
    left: 10px;
    right: auto;
  }
  .el-tabs--left .el-tabs__header.is-left {
    width: 100%;
    margin-right: 0;
  }
  .el-tabs--left .el-tabs__item.is-left {
    text-align: left;
  }
  .el-tabs__content {
    display: none;
  }
  .el-tabs__item {
    padding: 0 50px;
  }
}

.new-right {
  width: 80%;
  padding: 20px;
  background: #fff;
  .title{
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 1opx;
    border-bottom: 1px solid var(--bg_darken);
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
  }
}

@media (min-width: 1200px) {
  .new {
      max-width: 1140px;
  }
}

</style>