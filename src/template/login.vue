<template>
  <div>
    <span>文章序号:</span>
    <input type="num" v-model="count" />
  </div>
</template>
<script>
// actons辅助函数
import { mapActions } from 'vuex'; 
export default {
  name: "login",
  data() {
    return {
      count: 1,
    };
  },
  watch: {
    count(val) {
      this.$store.dispatch("increment1", val);
      this.increment1(val)
    },
  },
  mounted() {
    // this.$store.dispatch("increment1", 1);
    this.increment1(1)
    console.log(this.$router)
  },
  methods: {
    ...mapActions([
      'increment1'
    ])
  }
};
</script>
<style scoped>
span {
  margin-left: 10px;
}
input {
  margin: 10px;
  height: 30px;
  width: 200px;
}
</style>
