import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { getToken } from './utils/auth.js';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

// 动画插件
// import { WOW } from 'wowjs';
// import animated from './assets/css/animate.min.css';

// 图片放大器
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
// <!-- v-viewer 关键属性，引用图片放大预览 -->
// <div v-viewer>
// 	<!-- 可循环 或者 img + 静态图片 -->
// 	<img v-for="(item, index) in imageArr" :src="item" :key="index" />
// 	<!--<img src="/图片的路径" />-->
// </div>

Vue.use(ElementUI)
Vue.use(mavonEditor)
// Vue.use(animated)
// Vue.prototype.$wow = new WOW({
//     boxClass: 'wow', // 需要执行动画的元素的 class
//     animateClass: 'animated', //animation.css 动画的 class
//     offset: 0, // 距离可视区域多少开始执行动画
//     mobile: true, // 是否在移动设备上执行动画
//     live: true, // 异步加载的内容是否有效
// })

Vue.use(Viewer)
Viewer.setDefaults({
    Options: {
        'inline': true, //启用lnline模式
        'button': true, //显示右上角关闭按钮
        'navbar': true, //显示缩略图导航
        'title': true, //显示当前图片的标题
        'toolbar': true, //显示工具栏
        'tooltip': true, //显示缩放百分比
        'movable': true, //显示可移动
        'zoomable': true, //图片是否可缩放
        'rotatable': true, //图片是否可旋转
        'scalable': true, //图片是否可翻转
        'transition': true, //使用css3过度
        'fullscreen': true, //播放时是否全屏
        'keyboard': true, //是否支持键盘
        'url': 'data-source' //设置大图片的url
    }
})
Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
    // NProgress.start()
    // const hasToken = getToken()
    const userid = getToken('$userid');
    if (userid) {
        next()
    } else {
        if(to.path.indexOf('admin') > -1 ) {
            next('/')
        } else {
            next()
        }
    }
})

router.afterEach(() => {
    // NProgress.done()
})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
