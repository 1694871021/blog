<template>
  <div class="mood">
    <div class="add-btn">
      +  添加
    </div>
    <!-- <div class="artice-comment">
      <h4>评论一下</h4>
      <p class="comment-area">
        <textarea name="" id="" cols="30" rows="10" placeholder="请输入..." v-model="mainComment"></textarea>
      </p>
      <div class="comment-num">
        <p> 0 人参与，0 条评论 </p>
        <div class="comment-btn" @click="postComments">发布</div>
      </div>
    </div> -->
    <!-- 评论列表 -->
    <div class="comment-list" v-if="commentList.length">
      <comment v-for="(item) in commentList" :key="item.commentid" :commentInfo="item" @commentReply="reply" @commentsDel="getCommentsList" >
        <comment v-for="subitem in item.subcomment" :key="subitem.commentid" :commentInfo="subitem" :size="size" :shadow="false"
          @commentReply="reply" @commentsDel="getCommentsList"></comment>

        <div class="sub-comment" v-show="subCommentShow && item.commentid == parentId">
          <p class="comment-area">
            <textarea name="" id="" cols="30" :rows="subCommentrow" :placeholder="placeholder" v-model="subComment" @focus="subCommentblur"></textarea>
          </p>
          <div class="comment-num" v-show="subCommentbtn">
            <p></p>
            <div class="comment-btn" @click="postComments1">发布</div>
          </div>
        </div>
      </comment>
    </div>
    <div class="no-comment-list" v-else>
      暂无相关评论...
    </div>
  </div>
</template>
<script>
import comment from '../template/comment.vue';
import moment from 'moment';
import api from '../utils/api';
export default {
  data() {
    return {
      size: 'medium',
     
      menuContent: '',
      mainComment: '',
      subComment: '',
      placeholder: '请输入...',
      commentList: [],
      articleId: '',
      parentId: '',
      subCommentShow: false,
      replyusername: '', //点击子评论回复时对应的用户名
      subCommentrow: 1,
      subCommentbtn: false
    }
  },
  components: {
    comment
  },
  mounted(){
    // 评论接口
    this.getCommentsList();
  },
  methods: {
    getCommentsList() {
      api.getCommentsList({articleId: this.articleId}).then((res)=>{
        if(res.code == 0) {
          this.commentList = res.data;
        }
      })
    },
    postComments() {
      if(!this.$store.getters.getuserId) {
        this.$message({
          type: 'warning',
          message: '还未登录，请先进行登录！'
        })
        return
      }
      if(!this.mainComment) {
        this.$message({
          type: 'warning',
          message: '内容不能为空！'
        })
        return
      }

      var params = { 
        content: this.mainComment,
        articleId: this.articleId,
        commentid: Number(Math.random().toString().substr(3,8) + Date.now()).toString(36),
        commentime: moment().format('YYYY-MM-DD HH:mm:ss')
      }

      params = Object.assign({}, params, this.$store.getters.getUserInfo)
      api.postComments(params).then((res)=>{
        if(res.code == 0) {
          this.commentList.unshift(params)
          this.mainComment = ''
          this.$message({
            type: 'success',
            message: res.message
          })
        }
      })
    },
    postComments1() {
      if(!this.$store.getters.getuserId) {
        this.$message({
          type: 'warning',
          message: '还未登录，请先进行登录！'
        })
        return
      }
      if(!this.subComment) {
        this.$message({
          type: 'warning',
          message: '内容不能为空！'
        })
        return
      }
      var params = { 
        content: this.subComment,
        articleId: this.articleId,
        parentid: this.parentId,
        replyusername: this.replyusername || '',
        commentid: Number(Math.random().toString().substr(3,8) + Date.now()).toString(36),
        commentime: moment().format('YYYY-MM-DD HH:mm:ss')
      }
      params = Object.assign({}, params, this.$store.getters.getUserInfo)
      api.postComments(params).then((res)=>{
        if(res.code == 0) {
          this.commentList.forEach(item => {
            if(item.commentid == this.parentId) {
              item.subcomment.unshift(params);
            }
          })
          this.subComment = '';
          this.subCommentShow = false;
          // 隐藏发布按钮
          this.subCommentrow = 1;
          this.subCommentbtn = false
          this.$message({
            type: 'success',
            message: res.message
          })
        }
      })
    },

    reply(e) {
      if(e.parentid) {
        this.parentId = e.parentid;
        this.replyusername = e.username;
        
      } else {
        this.parentId = e.commentid;
        this.replyusername = '';
      }
      this.placeholder = '回复 @' + e.username + ':';
      this.subCommentShow = !this.subCommentShow;
      if(!this.subCommentShow) {
        this.subCommentrow = 1;
        this.subCommentbtn = false
      }
    },
    subCommentblur() {
      this.subCommentrow = 6;
      this.subCommentbtn = true;
    },
  }
}
</script>
<style lang="scss">
  .artice-comment {
    margin-top: 20px;
    padding: 15px;
    position: relative;
    background: #fff;
    .comment-area {
      height: auto;
      padding: 20px;
      margin: 10px 0;
      border-radius: 6px;
      box-shadow: inset 0px 0px 8px 2px rgba(0, 0, 0, 0.08);
      textarea {
        width: 100%;
        border: none;
        color: #555;
        background-color: transparent;
      }
    }
    .comment-num {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      .comment-btn {
        line-height: 30px;
        text-align: center;
        padding: 0 20px;
        border-radius: 6px;
        cursor: pointer;
        color: #fff;
        background: #ff9800;
      }
    }
    
  }
  .sub-comment {
    position: relative;
    background: #fff;
    .comment-area {
      margin: 6px 0;
      transition: all 1s;
      textarea {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #e2e2e2;
        padding: 10px;
        color: #555;
        border-radius: 6px;
        background-color: #f0eeee;
        transition: all 1s;
        // border: 1px solid var(--bg_darken);
        // border-radius: 5px;
        // color: var(--font_2);
        // background-color: var(--bg);
      }
    }
    .comment-num {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      .comment-btn {
        line-height: 30px;
        text-align: center;
        padding: 0 20px;
        border-radius: 6px;
        cursor: pointer;
        color: #fff;
        background: #ff9800;
      }
    }
  }
  .mood {
    padding: 20px 0;
    .add-btn {
    line-height: 30px;
    padding: 0 20px;
    font-size: 14px;
    color: #fff;
    background: #409EFF;
  }
  }

  @media (min-width: 1200px) {
    .mood {
        max-width: 1140px;
    }
  }
</style>