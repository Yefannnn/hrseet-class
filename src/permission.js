// 全局前路由守卫
import router from '@/router'
import store from '@/store'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

const White = ['/404', '/login']

// 前置守卫
router.beforeEach(async(to, form, next) => {
  nProgress.start()
  if (store.getters.token) {
    // 有token，判断to的path
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断如果用户token && 不去登录 && 没有userinfo
      // store.getters.userId ? next() : await store.dispatch('user/getUserInfo') && next()
      const userId = store.getters.userId
      if (!userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (White.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
  nProgress.done()
})

// 后置守卫
router.afterEach((to, form) => {
  nProgress.done()
})
