import Router from 'vue-router';
import Vue from 'vue';
Vue.use(Router);

var router = new Router({
  mode: 'hash',
  routes: [
    {
      path: "/",
      name: "index",
      component: () =>
        import("./view/index.vue")
    }
  ]
})

export default router;