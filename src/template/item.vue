<template>
  <div class="custom-item clearfix wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
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
  margin-bottom: 20px;
  border-radius: 6px;
  .custom-image {
    width: 230px;
    margin-right: 20px;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    img {
      width: 100%;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  
  .custom-content {
    width: 69%;
    color: #555;
    .custom-title {
      font-size: 22px;
      line-height: 30px;
      a {
        display: block;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
    }
    // 一行溢出隐藏
    // white-space:nowrap;
    // overflow:hidden;
    // text-overflow:ellipsis;
    .custom-text {
      min-height: 40px;
      font-size: 16px;
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
      .custom-icon {
        span {
          margin-right: 5px;
        }
        .iconfont {
          margin-right: 3px;
        }
      }

      .custom-btn {
        width: 80px;
        line-height: 27px;
        text-align: center;
        border-radius: 6px;
        cursor: pointer;
        background: #ff9800;
        a {
          color: #fff;
        }
      }
    }
  }
  
  
}
.custom-item:first-child {
  margin-top: -20px;
  border-radius: 0 0 6px 6px;
}
</style>