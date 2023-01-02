<template>
  <div class="detail-box">
    <div class="detail-banner">
      <div class="banner-title">
        <p>哈哈哈哈哈的博客</p>
        <p>气味儿问问额鹅鹅鹅</p>
      </div>
      <img src="../static/images/c6064c3cffb086f20b3ede738184432b.jpeg" alt="">
    </div >
    <div class="article">
      <div class="article-title">
        <h2>哈哈哈哈哈的博客</h2>
        <p>
          <span>发布时间：<i>2022/01/01</i></span>
          <span>作者：<i>2022/01/01</i></span>
          <span>来源：<i>2022/01/01</i></span>
        </p>
        <!-- 标签 -->
        <p style="color: #FE9800">
          <i>HTML</i>
          <i>CSS</i>
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
        <div class="detail-menu" :class="{'detail-menu-fixed': isFixed}" v-show="menuContent" v-html="markData.menu"></div>
      </div>
      <!-- 评论一下 -->
      <div class="artice-comment">
        <h4>评论一下</h4>
        <p class="comment-area">
          <textarea name="" id="" cols="30" rows="10" placeholder="请输入..."></textarea>
        </p>
        <div class="comment-num">
          <p>
            32 人参与，0 条评论
          </p>
          <div class="comment-btn">发布评论</div>
        </div>
      </div>
      <!-- 评论列表 -->
      <div class="comment-list">
        <comment>
          <comment :size="size" :shadow="false"></comment>
        </comment>
      </div>
    </div>
  </div>
</template>
<script>
import comment from '../template/comment.vue'
export default {
  data() {
    return {
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      size: 'small',
      markData:{
        title: '暖了北港',
        creattime: '',  
        view: '0',
        commentary: '0',
        like: '0',
        content:  '',
      },
      menuContent: '',
      isFixed: false
    }
  },
  components: {
    comment
  },
  methods: {
    getDetails() {
      let params = {id: this.$route.query.id};
      api.getArticleDetail(params).then(res => {
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
    // 添加浏览记录
    getRecord() {
      this.markData.view += 1;
      let params = {
        id: this.$route.query.id,
        view: this.markData.view
      };
      api.addRecord(params).then(res => {
        if (res && res.code == 0) {  
        }
      });
    },
    // 处理导航目录
    slopeMenu(){
      var _this = window;
      var gopage = document.querySelectorAll(".detail-menu a");
      var gopage1 = document.querySelectorAll(".detail-mavon a");
      var gopage2 = document.getElementsByClassName("detail-mavon")[0];
      var gopage3 = document.getElementsByClassName("detail-banner")[0];
      gopage.forEach((item,index) => {
        item.addEventListener('click', function(){
          gopage1.forEach((gitem,gindex)=>{
            if(gitem.id == item.id){
              if(gitem.offsetTop > 0){
                var y = gitem.offsetTop + gopage3.offsetHeight - 50;
                _this.scrollTo(0,y);
              }
            }
          })
        })
      }) 
    }
  }
}
</script>
<style lang="scss">
.detail-box {
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
  width: 1200px;
  margin: 20px auto;
  .article-title {
    padding-top: 10px;
    text-align: center;
    background: #fff;
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
    /* 侧边导航栏 */
    .detail-menu{
      width: 2.3rem;
      min-width: 2rem;
      min-height: 2rem;
      padding: 0.1rem;
      background: rgba(255,255,255,.8);
      box-shadow: 0 0 10px 5px rgb(220 220 220 / 30%);
      -webkit-box-shadow: 0 0 10px 5px rgb(220 220 220 / 30%);
      position: absolute;
      top: 0;
      right: 0.2rem;
      z-index: 2000;
    }

    .detail-menu h1, .detail-menu h2, .detail-menu h3, .detail-menu h4, .detail-menu h5, .detail-menu h6 {
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

    .detail-menu a{
      width: 2rem;
      height: 0.2rem;
      position: absolute;
    }

    .detail-menu h2{
      padding-left: 0.1rem;
    }
    .detail-menu h3{
      padding-left: 0.2rem;
    }
    .detail-menu h4{
      padding-left: 0.25rem;
    }
    .detail-menu h5{
      padding-left: 0.3rem;
    }
    .detail-menu h6{
      padding-left: 0.35rem;
    }
  }
  .artice-comment {
    margin-top: 20px;
    padding: 15px;
    position: relative;
    background: #fff;
    .comment-area {
      height: 150px;
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
    }
    .comment-btn {
      width: 80px;
      line-height: 30px;
      text-align: center;
      position: absolute;
      right: 10px;
      bottom: 10px;
      border-radius: 6px;
      color: #fff;
      background: #ff9800;
    }
  }
}

.comment-list {
  
}
</style>