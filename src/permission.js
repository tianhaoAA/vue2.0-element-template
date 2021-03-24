import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  if (to.path === '/login') {
    next()
    NProgress.done()
  } else {
    // 登录验证 登录状态是false 路由重新定向跳转到登录页
    if (!store.getters.isLogin) {
      next('/login')
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

