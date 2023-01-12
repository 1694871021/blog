<template>
  <div class="detail-box">
    <div class="detail-banner">
      <div class="banner-title">
        <p>{{ markData.title }}</p>
        <p>{{ markData.summary }}</p>
      </div>
      <img :src="markData.coverImage" alt="">
    </div >
    <div class="article">
      <div class="article-title">
        <h2>{{ markData.title }}</h2>
        <p class="article-auth">
          <span>发布时间：<i>{{ markData.time }}</i></span>
          <span>作者：<i>{{ markData.username }}</i></span>
          <span>来源：<i>{{ markData.username }}个人博客</i></span>
        </p>
        <!-- 标签 -->
        <p style="color: #FE9800">
          {{markData.tags}}
        </p>
      </div>
      <!-- 内容 -->
      <div class="article-content">
        <div class="detail-mavon">
          <mavon-editor                                    
            v-model="markData.content"                                     
            :subfield="false"                                    
            :boxShadow="false"                                    
            defaultOpen="preview"                                    
            :toolbarsFlag="false"
            placeholder="请打开目录导航栏，以便获取对应目录..."                                   
          />
        </div>                           
      </div>
      <div class="detail-menu" :class="{isFixed}" v-show="menuContent" v-html="markData.menu"></div>
      <!-- 评论一下 -->
      <div class="artice-comment">
        <h4>评论一下</h4>
        <p class="comment-area">
          <textarea name="" id="" cols="30" rows="10" placeholder="请输入..." v-model="mainComment"></textarea>
        </p>
        <div class="comment-num">
          <p> 0 人参与，0 条评论 </p>
          <div class="comment-btn" @click="postComments">发布</div>
        </div>
      </div>
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
      markData:{
        title: '暖了北港',
        creattime: '',  
        view: '0',
        commentary: '0',
        like: '0',
        content:  '',
      },
      menuContent: '',
      mainComment: '',
      subComment: '',
      placeholder: '请输入...',
      isFixed: false,
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
    this.$parent.onSend(false);
    this.articleId = this.$route.query.articleId;
    this.getDetails();
    // 评论接口
    this.getCommentsList();
    document.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getDetails() {
      api.getArticleInfo({ articleId: this.articleId }).then(res => {
        if (res && res.code == 0) {
          this.markData = res.data;
          if(res.data.menu){
            this.menuContent = res.data.menu;
          }
          this.getRecord();
          this.$nextTick(function(){
            this.slopeMenu();
          })
        }
      });
    },
    getCommentsList() {
      api.getCommentsList({articleId: this.articleId}).then((res)=>{
        if(res.code == 0) {
          this.commentList = res.data;
        }
      })
    },
    // 添加浏览记录 
    getRecord() {
      api.addRecord({ articleId: this.articleId }).then(res => {
      });
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
    // 处理导航目录
    slopeMenu(){
      var _this = window;
      var gopage = document.querySelectorAll(".detail-menu a");
      var gopage1 = document.querySelectorAll(".detail-mavon a");
      var gopage3 = document.getElementsByClassName("detail-box")[0];
      gopage.forEach((item,index) => {
        item.addEventListener('click', function(){
          gopage1.forEach((gitem,gindex)=>{
            console.log(3333333333333, gitem.id, item.id)
            if(gitem.id == item.id){
              if(gitem.offsetTop > 0){
                var y = gitem.offsetTop + gopage3.offsetHeight - 50;
                _this.scrollTo(0,y);
              }
            }
          })
        })
      }) 
    },
    handleScroll() {
      //获取滚动时的高度
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 760) {
        this.isFixed = true
      }else{
        this.isFixed = false
      }
    }
  },
  beforeDestroy() {
    this.$parent.onSend(true)
  }
}
</script>
<style lang="scss">
.detail-box {
  width: 100%;
  background: var(--main-bg);
  color: #555;
}
 
.detail-banner{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .banner-title {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    transform: translate(-50%, -50%);
    p:first-child {
      font-size: 28px;
    }
  }
  img {
    width: 100%;
  }
}

.article {
  width: calc(100% - 240px);
  padding: 0 120px;
  padding-bottom: 20px;
  margin-top: 20px;
  position: relative;
  box-sizing: border-box;
  position: relative;
  .article-title {
    padding: 10px 0;
    text-align: center;
    background: #fff;
    .article-auth {
      span {
        margin-left: 10px;
      }
    }
    p {
      margin-top: 10px;
    }
  }
  .article-content {
    min-height: 300px;
    background: #fff;
    .detail-mavon{
      font-family: "行楷";
      box-shadow: 0 0 10px 5px rgb(220 220 220 / 30%);
      -webkit-box-shadow: 0 0 10px 5px rgb(220 220 220 / 30%);
    }
  }
  /* 侧边导航栏 */
  .detail-menu{
    width: 200px;
    min-width: 20px;
    min-height: 20px;
    padding: 10px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    display: block;
    position: absolute;
    top: 0;
    right: -120px;
    z-index: 2000;
    h1, h2, h3, h4, h5, h6 {
      margin: 2px 0;
      font-weight: 500;
      font-size: 17px;
      color: #2185d0;
      border-bottom: none;
      cursor: pointer;
      line-height: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      position: relative;
    }
    a{
      width: calc(100%);
      height: 20px;
      display: block;
      position: absolute;
    }

    h2{
      padding-left: 10px;
    }
    h3{
      padding-left: 20px;
    }
    h4{
      padding-left: 25px;
    }
    h5{
      padding-left: 30px;
    }
    h6{
      padding-left: 35px;
    }
  }
  .isFixed{
      position: fixed;
      top: 70px;
      right: 120px;
    }
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
}

.no-comment-list {
  line-height: 150px;
  text-align:center;
  padding: 0 15px;
  background: #fff;
}
</style>