<template>
  <div class="main">
    <div class="main-left">
      <div class="card" style="margin-bottom: 0; border-radius: 6px 6px 0 0;">
        <div class="title">
          <h3>精选文章</h3>
          <div class="select-type">
            <span>前端</span>
            <span>后端</span>
          </div>
        </div>
      </div>
      <items v-for="(item) in list" :key="item.articleId" :item="item"></items>
      <div class="card wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
        <div class="title">
          <h3>进入热搜</h3>
          <div>
            <a href="">更多</a>
          </div>
        </div>
        <div class="content">
          内容区域
        </div>
      </div>
      <div class="card wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
        <div class="title">
          <h3>博客文章</h3>
          <div>
            <a href="">更多</a>
          </div>
        </div>
        <div class="content">
          内容区域
        </div>
      </div>
    </div>
    <div class="main-right">
      <div  class="card wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
        <div class="title">
          <h3>独家广告</h3>
          <div>
            <a href="">申请</a>
          </div>
        </div>
        <div class="content">
          内容区域
        </div>
      </div>
      <div  class="card wow slideInUp" data-wow-duration="2s" data-wow-iteration="1" data-wow-offset="0">
        <div class="title">
          <h3>标签云</h3>
        </div>
        <div class="content biaoqian">
          <ul>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import items from '../template/item.vue'
import api from '../utils/api';
export default {
  components: {
    items
  },
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(){
      var _this = this;
      let params = { 
        // page: this.currentPage,
        // pagesize: 10
      };
      api.getRecommendList(params).then((res) => {
        if (res && res.code == 0) {
          this.list = res.data;
          this.$nextTick(() => {
            this.$wow.init()
          });
        }
      });
    },
  }
}

</script>