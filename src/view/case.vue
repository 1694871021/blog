<template>
  <div class="case-container" style="padding-top: 70px;">
    <el-tabs tab-position="left" style="height: auto">
      <el-tab-pane label="瀑布流">
        <waterfall-flow></waterfall-flow>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>  
</template>
<script>
import waterfallFlow from '../casebase/waterfallFlow.vue';
export default {
  components: {
    waterfallFlow
  },
  mounted() {
    this.$parent.onSend(false);
    this.$parent.onSend1(false);
  }
}
</script>