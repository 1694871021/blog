<template>
  <div class="custom-item wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
    <div class="custom-image">
      <img :src="item.coverImage" alt="">
    </div>
    <div class="custom-content">
      <p class="custom-title">
        <router-link :to="{path: '/article', query: {articleId:  item.articleId}}">{{ item.title }}</router-link>
      </p>
      <p class="custom-text">
        {{ item.summary }}
      </p>
      <div class="custom-num">
        <p class="custom-icon">
          <i class="iconfont icon-shizhong"></i> <span>{{ item.time }}</span>
          <i class="iconfont icon-dianzan"></i><span>{{ item.dianzan }}</span>
          <i class="iconfont icon-chakan"></i><span>{{ item.chakan }}</span>
          <i class="iconfont icon-weixin"></i><span>{{ item.xiaoxi }}</span>
          <i class="iconfont icon-shoucang"></i><span>{{ item.shoucang }}</span>
        </p>
        <p  class="custom-btn">
          <router-link :to="{path: '/article', query: {articleId:  item.articleId}}">查看详情</router-link>
        </p>
      </div>
    </div>
    <div class="categroy-flag">
       {{ item.type }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object
    }
  }
}
</script>
<style lang="scss">
.custom-item {
  display: flex;
  font-size: 12px;
  background: #fff;
  padding: 20px 15px;
  margin-bottom: 15px;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  .custom-image {
    width: 210px;
    margin-right: 20px;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    img {
      width: 100%;
      display: block;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  
  .custom-content {
    width: calc(100% - 230px);
    color: #555;
    .custom-title {
      font-size: 22px;
      line-height: 30px;
      a {
        display: block;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        transition: all 0.3s;
        &:hover {
          color: #409EFF;
        }
      }
    }
    // 一行溢出隐藏
    // white-space:nowrap;
    // overflow:hidden;
    // text-overflow:ellipsis;
    .custom-text {
      min-height: 48px;
      line-height: 24px;
      font-size: 14px;
      margin: 10px 0;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .custom-num {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #777;
      .custom-icon {
        font-size: 13px;
        span {
          margin-right: 5px;
        }
        .iconfont {
          margin-right: 3px;
          vertical-align: text-top;
        }
      }

      .custom-btn {
        width: 80px;
        line-height: 27px;
        text-align: center;
        border-radius: 6px;
        cursor: pointer;
        background: #409EFF;
        a {
          color: #fff;
        }
      }
    }
  }
  .categroy-flag{
    position: absolute;
    color: white;
    top: 9px;
    right: -20px;
    width: 80px;
    height: 20px;
    font-size: 14px;
    background-color: #409eff;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotate(45deg);
  }
  
  
}
.custom-item:first-child {
  margin-top: -20px;
  border-radius: 0 0 6px 6px;
}
</style>