import request from '@/utils/request'

// 登录方法
export const userlogin = data => request({
  method: 'POST',
  url: '/sys/login',
  data
})

// 获取用户基本信息
export const getUserInfo = () => require({
  method: 'POST',
  url: '/sys/profile'
})
