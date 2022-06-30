import axios from 'axios'

const service = axios.create({
  baseURL: 'xxx',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  // config 是配置对象
  return config
})

// 响应拦截器
service.interceptors.response.use(res => {
  return res
})

// 导出service实例

export default service
