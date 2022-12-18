<template>
  <div class="custom-item clearfix">
    <div class="custom-image">
      <img src="../static/images/57ece79847ae9ba02d62a92b39685cfc.jpg" alt="">
    </div>
    <div class="custom-content">
      <p class="custom-title"><a href="">333333333333</a></p>
      <p class="custom-text">
        呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱
      </p>
      <div class="custom-num">
        <p>
          <span>呱呱呱</span>
          <span>呱呱呱</span>
          <span>呱呱呱</span>
          <span>呱呱呱</span>
          <span>呱呱呱</span>
        </p>
        <p  class="custom-btn">查看详情</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.custom-item {
  display: flex;
  font-size: 12px;
  background: #fff;
  padding: 10px 0 15px;
  border-bottom: 1px solid #eee;
  .custom-image {
    width: 30%;
    margin-right: 10px;
    cursor: pointer;
    overflow: hidden;
    img {
      width: 100%;
      &:hover {
        transform: scale(1.1);
        transition: all 0.3s;
      }
    }
  }
  .custom-content {
    width: 70%;
    color: #555;
    .custom-title {
      font-size: 30px;
    }
    // 一行溢出隐藏
    // white-space:nowrap;
    // overflow:hidden;
    // text-overflow:ellipsis;
    .custom-text {
      min-height: 45px;
      margin: 10px 0;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    .custom-num {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .custom-btn {
        width: 80px;
        line-height: 27px;
        text-align: center;
        border-radius: 6px;
        color: #fff;
        cursor: pointer;
        background: #ff9800;
      }
    }
  }
  &:last-child {
    border: none;
    padding-bottom: 0;
  }
}
</style>