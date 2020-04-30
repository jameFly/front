import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Proingress 进度条样式
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios' //ajax
import echarts from 'echarts' // echarts
import './style/ele-ui.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$ajax = axios
Vue.prototype.$echarts = echarts;

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
