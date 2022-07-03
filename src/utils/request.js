import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import { getTime } from '@/utils/auth'
import { IsCheckTimeOut } from '@/utils/validate'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 通过环境变量的值作为基础地址
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  // config 是配置对象
  const token = store.getters.token
  // token ? config.headers['Authorization'] = `Bearer ${token}` : ''
  if (token) {
    // 有token，检查时间戳
    if (IsCheckTimeOut(2)) {
      // 超时了,跳转登录页，并且删除token和userinfo
      store.dispatch('user/logout')
      router.push('/login')
      Message.error('身份验证失败，重新登录')
      return Promise.reject('身份验证失败，重新登录')
    }
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => {
  Message.error(error.message)
  return Promise.reject(error.messgae)
})

// 响应拦截器
service.interceptors.response.use(res => {
  const { success, message } = res.data
  return success ? res.data : Message.error(message) && Promise.reject(new Error(message))
}, error => {
  if (error.response?.data?.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
    // Message.error('身份验证失败，重新登录')
  }
  Message.error(error.message)
  return Promise.reject(error.message)
})

// 导出service实例

export default service
