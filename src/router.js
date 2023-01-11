import Router from 'vue-router';
import Vue from 'vue';
Vue.use(Router);

export const errorHtml = {
  path: '*',
  memuname: '*',
  redirect: '/404'
}
var router = new Router({
  mode: 'hash',
  routes: [
    {
      path: "/",
      memuname: '首页',
      component: () => import("./view/index.vue"),
      redirect: 'home',
      children: [
        {
          path: 'home',
          fullPath: 'home',
          component: () => import('./view/home.vue'),
          memuname: '首页',
          meta: { title: '' }
        },
        {
          path: 'news',
          fullPath: 'news',
          component: () => import('./view/news.vue'),
          memuname: '新闻',
          meta: { title: '' }
        },
        // {
        //   path: 'mood',
        //   fullPath: 'mood',
        //   component: () => import('@view/mood.vue'),
        //   memuname: '心情',
        //   meta: { title: '' }
        // },
        // {
        //   path: 'memoir',
        //   fullPath: 'memoir',
        //   component: () => import('@view/memoir.vue'),
        //   memuname: '回忆录',
        //   meta: { title: '' }
        // },
        // {
        //   path: 'case',
        //   fullPath: 'case',
        //   component: () => import('@view/case.vue'),
        //   memuname: '积累案例',
        //   meta: { title: '' }
        // },
      ]
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
          {path: '/admin/navigation', iconCls:'el-icon-plus', component: () => import("./view/admin/navigation.vue"), name: '背景图管理'},
          // {path: '/admin/img', component: Img, name: '添加图片'},
      ]
    },
    // {
    //   path: '/404',
    //   name: '404',
    //   component: ()=>import('@/views/error/404')
    // }
  ]
})

export default router;