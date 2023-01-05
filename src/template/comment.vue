<template>
  <div class="comment-item">
    <div class="item-cover">
      <el-avatar shape="square" :size="size" :src="commentInfo.avatar"></el-avatar>
    </div>
    <div class="item-box" :class="{shadow}">
      <div  class="item-user">
        <span>用户名   </span>
        <span>{{commentInfo.username}}</span>
      </div>
      <div class="item-content">
        {{commentInfo.content}}
      </div>
      <div class="item-time">
        <p>{{commentInfo.commentime}}</p>
        <p class="item-thumbs-up" v-if="islogin">
          <span @click="tumbsupClick">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-dianzan1"></use>
            </svg>
            {{commentInfo.likenum}}
          </span>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiaoxi"></use>
            </svg>
            {{ commentInfo.replynum }}
          </span>
          <span @click="delClick">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shanchu1"></use>
            </svg>
          </span>
        </p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import api from '../utils/api'
export default {
  data() {
    return {
      islogin: this.$store.state.userInfo.username || ''
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
  },
  methods: {
    tumbsupClick() {
      api.commentstTumbsup({commentid: this.commentInfo.commentid}).then((res)=>{
        if(res.code == 0) {
          this.commentInfo.likenum +=1;
        }
      })
    },
    delClick() {
      api.commentsDel({commentid: this.commentInfo.commentid}).then((res)=>{
        if(res.code == 0) {
          this.$emit('commentsDel');
          this.$message({
            type: 'success',
            message: res.message
          })
        }
      })
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
    font-size: 13px;
    color: #888;
    background: #fff;
    letter-spacing: 1px;
  }
  .shadow {
    padding: 10px;
    box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.05);
  }
  .item-user {
    span:first-child {
      font-size: 14px;
      font-weight: 600;
    } 
  }
  .item-content {
    padding: 5px 0;
  }

  .item-time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: #ff9800;
      font-size: 14px;
      cursor: pointer; 
      margin-left: 5px;
    }
    .item-thumbs-up {
      .icon {
        font-size: 22px;
      }
    }
  }
}
</style>