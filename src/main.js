import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'  // 初始化的样式
import router from './router'
import store from './store'
import ElementUI from 'element-ui'; //引入UI组件库 
import 'element-ui/lib/theme-chalk/index.css'; //element-ui样式


Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
