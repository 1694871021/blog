<template>
  <div class="detail-box">
    <div class="detail-banner">
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
        <p>
          <i>HTML</i>
          <i>CSS</i>
        </p>
      </div>
      <!-- 内容 -->
      <div class="article-content">

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
        <div class="comment-item">
          <div class="item-cover">
            <img src="" alt="">
          </div>
          <div class="item-box">
            <div class="item-content">
              <p class="item-user">用户名</p>
              <p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
            </div>
            <div class="item-time">
              <p>2022-01-01</p>
              <p>
                <span>点赞（）</span>
                <span>回复（）</span>
                <span>删除</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  
</script>
<style lang="scss">
.detail-box {
  background: var(--main-bg);
}

.detail-banner{
  width: 100%;
  height: 100vh;
  overflow: hidden;
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
  margin-top: 20px;
  background: #fff;
  .comment-item {
    display: flex;
    .item-cover {
      width: 60px;
      img {
        border-radius: 6px;
      }
    }
    .item-box {
      width: calc(100%);
      padding: 10px;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
    }
    .item-content {
      min-height: 50px;
      .item-user {
        font-size: 14px;
        font-weight: 400;
      }
    }
    .item-time {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin-left: 5px;
       cursor: pointer; 
      }
    }
  }
}
</style>