import request from '@/utils/request'

// 登录方法
export const userlogin = data => request({
  method: 'POST',
  url: ' /sys/login',
  data
})
