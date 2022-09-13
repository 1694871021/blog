<template>
  <div v-if="content.length">
    <div class="cont" v-for="item in content" :key="item.id">
      <div>{{ item.id }}. {{ item.title }}</div>
      <div>{{ item.detailTitle }}</div>
      <div class="example">{{ item.content }}</div>
    </div>
  </div>
  <div class="cont" v-else>
    <div>{{ content.id }}. {{ content.title }}</div>
    <div>{{ content.detailTitle }}</div>
    <div class="example">{{ content.content }}</div>
  </div>
</template>
<script>
// state辅助函数
import { mapState } from "vuex";
export default {
  name: "login",
  data() {
    return {};
  },
  computed: {
    // content() {
    //   return this.$store.state.content;
    // },
    ...mapState({
      content: (state) => state.content,
    }),
  },
  methods: {},
};
</script>
<style scoped>
.cont > div {
  margin: 10px;
}
.example {
  color: red;
  font-size: 15px;
}
</style>