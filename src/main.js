import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css' // 初始化的样式
import router from './router'
import store from './store'
import Cookies from 'js-cookie'
import ElementUI from 'element-ui' // 引入UI组件库
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
// import 'element-ui/lib/theme-chalk/index.css' // element-ui样式
import './styles/element-variables.scss'
import './icons' // icon图标
import '@/styles/index.scss' // global css
import './permission' // permission control
import './utils/error-log' // error log
import './routers_permission'
Vue.config.productionTip = false
// development  production
if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
