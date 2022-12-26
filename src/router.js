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
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import("./view/login.vue")
    },
    {
      path: "/article",
      name: "article",
      component: () =>
        import("./view/article.vue")
    },
  ]
})

export default router;