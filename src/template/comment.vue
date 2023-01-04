<template>
  <div class="comment-item">
    <div class="item-cover">
      <el-avatar shape="square" :size="size" :src="commentInfo.avatar"></el-avatar>
    </div>
    <div class="item-box" :class="{shadow}">
      <div class="item-content">
        <p class="item-user">用户名</p>
        <p>{{commentInfo.username}}</p>
      </div>
      <div class="item-time">
        <p>{{commentInfo.commentime}}</p>
        <p>
          <span>点赞（{{commentInfo.likenum}}）</span>
          <span>回复（{{commentInfo.replynum}}）</span>
          <span>删除</span>
        </p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: {
    size: {
      type: String,
      default: 'medium'
    },
    shadow: {
      type: Boolean,
      default: true
    },
    commentInfo: {
      type: Object,
      default: {}
    }
  }
}
</script>
<style lang="scss">
.comment-item {
  margin-top: 10px;
  display: flex;
  .item-cover {
    margin-right: 16px;
  }
  .item-box {
    width: calc(100%);
    color: #888;
    background: #fff;
    letter-spacing: 1px;
  }
  .shadow {
    padding: 10px;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
  }
  .item-content {
    min-height: 46px;
    .item-user {
      font-size: 14px;
      font-weight: 600;
    }
  }
  .item-time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      cursor: pointer; 
    }
  }
}
</style>