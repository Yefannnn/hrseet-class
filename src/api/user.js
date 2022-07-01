import request from '@/utils/request'

// 登录方法
export const userlogin = data => request({
  method: 'POST',
  url: '/sys/login',
  data
})

// 获取用户基本信息
export const getUserInfo = () => request({
  method: 'post',
  url: '/sys/profile'
})

// 获取员工的基本信息
export const getUserDetailById = id => request({
  url: `/sys/user/${id}`
})
