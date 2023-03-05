<template>
  <div class="common-tab">
    <ul :class="{horizontal}">
      <li class="tab-item" v-for="item in tabs" :key="item" @click="tabClick(item)" :class="{'active': activeItem == item}">{{ item }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  // name: 'tab',
  data() {
    return{
      activeItem: ''
    }
  },
  props:{
    tabs: {
      type: Array
    },
    horizontal: {
      type: Boolean,
      default: true
    },
    tabItem: {
      type: String
    },
  },
  mounted() {
    this.activeItem = this.tabItem
  },
  methods: {
    tabClick(e) {
      if(this.activeItem == e) return;
      this.activeItem = e;
      this.$emit('tabChange', e)
    }
  }
}
</script>
<style>
.common-tab .horizontal {
  display: flex;
}

.common-tab .tab-item {
  font-size: 13px;
  font-weight: bold;
  margin-left: 5px;
  transition: all 0.3s;
  cursor: pointer;
}

.common-tab .tab-item:hover {
  color: #409EFF;
}

.common-tab .active {
  color: #409EFF;
}
</style>