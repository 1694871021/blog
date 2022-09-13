<template>
  <div>
      <loginVue/>
      <userVue/>
  </div>
</template>

<script>
import loginVue from './template/login.vue'
import userVue from './template/user.vue'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    loginVue,
    userVue
  }
}
</script>