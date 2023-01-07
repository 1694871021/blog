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
      path: "/register",
      name: "register",
      component: () =>
        import("./view/register.vue")
    },
    {
      path: "/article",
      name: "article",
      component: () =>
        import("./view/article.vue")
    },
    {
      path: '/admin',
      component: () => import("./view/admin/admin.vue"),
      name: 'admin',
      iconCls: 'el-icon-message',//图标样式class
      children: [
          {path: '/admin/list', iconCls:'el-icon-s-data', component: () => import("./view/admin/list.vue"), name: '文章列表'},
          {path: '/admin/add', iconCls:'el-icon-plus', component: () => import("./view/admin/add.vue"), name: '添加文章'},
          {path: '/admin/user', iconCls:'el-icon-plus', component: () => import("./view/admin/user.vue"), name: '用户管理'},
          // {path: '/admin/img', component: Img, name: '添加图片'},
      ]
    }
  ]
})

export default router;