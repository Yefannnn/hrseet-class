import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 通过环境变量的值作为基础地址
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  // config 是配置对象
  const token = store.getters.token
  token ? config.headers['Authorization'] = `Bearer ${token}` : ''
  return config
})

// 响应拦截器
service.interceptors.response.use(res => {
  const { success, message } = res.data
  return success ? res.data : Message.error(message) && Promise.reject(new Error(message))
}, error => {
  Message.error(error.message)
  return Promise.reject(error.message)
})

// 导出service实例

export default service
