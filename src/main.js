import Vue from 'vue';
import App from './App.vue';
import store from './store';

import router from './router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

import { WOW } from './static/js/wow.min.js';
import animated from './static/css/animate.min.css';


Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.use(animated)
Vue.prototype.$wow = new WOW({
    boxClass: 'wow', // 需要执行动画的元素的 class
    animateClass: 'animated', //animation.css 动画的 class
    offset: 0, // 距离可视区域多少开始执行动画
    mobile: true, // 是否在移动设备上执行动画
    live: true, // 异步加载的内容是否有效
})
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')