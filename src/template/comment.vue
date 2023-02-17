<template>
  <div class="comment-item">
    <div class="item-cover">
      <el-avatar shape="square" :size="size" :src="commentInfo.avatar"></el-avatar>
    </div>
    <div class="item-box" :class="{shadow}">
      <div  class="item-user">
        <h4 v-if="commentInfo.replyusername">
          {{commentInfo.username}} 回复  @{{commentInfo.replyusername}}
        </h4>
        <h4 v-else>
          {{commentInfo.username}}
        </h4>
        <!-- <span v-if="commentInfo.replyusername">{{commentInfo.username}} 回复  @{{commentInfo.replyusername}}</span>
        <span v-else>{{commentInfo.username}}</span> -->
      </div>
      <div class="item-content">
        {{commentInfo.content}}
      </div>
      <div class="item-time">
        <p>{{commentInfo.commentime}}</p>
        <p class="item-thumbs-up" v-if="islogin">
          <span @click="tumbsupClick(commentInfo.commentid)">
            <svg class="icon" aria-hidden="true" :class="{dianzanAnimate}">
              <use xlink:href="#icon-dianzan1"></use>
            </svg>
            {{commentInfo.dianzan || 0}}
          </span>
          <span @click="replyClick(commentInfo)">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiaoxi"></use>
            </svg>
            {{commentInfo.subcomment && commentInfo.subcomment.length}}
          </span>
          <span @click="delClick(commentInfo.commentid)" v-if="commentInfo.userid == userid">
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
      userid: this.$store.getters.getuserId || '',
      islogin: this.$store.getters.getuserId || '',
      dianzanAnimate: false
    }
  },
  props: {
    size: {
      type: String,
      default: 'large'
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
      // 可用于添加样式
      //var dom = this.$refs.aaa
      // dom.classList.add('show')
      api.commentstTumbsup({commentid: this.commentInfo.commentid}).then((res)=>{
        if(res.code == 0) {
          this.commentInfo.dianzan +=1;
          this.dianzanAnimate = true
        }
      })
    },
    // 回复逻辑: 点击一级评论的回复和二级评论的回复，分别传parentid, commentid，一级评论为父评论无parentid所有传commentid, 点击二级评论的回复时评论内容归属上一级的父评论
    replyClick(e) {
      this.$emit('commentReply', e);
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
    border-radius: 6px;
    background: #fff;
    letter-spacing: 1px;
  }
  .shadow {
    padding: 10px;
    box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.1);
  }
  .item-user {
    font-size: 14px;
    font-weight: 600;
  }
  .item-content {
    padding: 5px 0 0 0;
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
.dianzanAnimate {
      animation: scaleDraw 1s ease-in-out;
  }
/* 点赞动画效果 */
@keyframes scaleDraw{
  0% {
          transform: scale(1);  /*开始为原始大小*/
  }
  25% {
        transform: scale(1.3); /*放大1.1倍*/
  }
  50% {
      transform: scale(1);
  }
  75% {
      transform: scale(1.3);
  }
}
@keyframes Clickfd {
    0% {
        top:0px; 
    }
    10% {
        top:-3px; 
    }
    20% {
        top:-6px; 
    }
    30% {
        top:-9px; 
    }
    40% {
        top:-12px; 
        transform: rotate(6deg);
    }
    50% {
        top:-15px; 
        transform: rotate(12deg);
    }
    60% {
        top:-18px; 
        transform: rotate(6deg);
    }
    70% {
        top:-21px;
        transform: rotate(0deg);
    }
    80% {
        top:-24px;
        transform: rotate(-6deg);
    }
    90% {
        top:-27px;
        transform: rotate(-12deg);
    }
    100% {
        top:-30px;
        transform: rotate(-6deg);
    }
}
</style>