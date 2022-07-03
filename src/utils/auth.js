import Cookies from 'js-cookie'

const TokenKey = 'ITHEIMA_HR'
const TimeKey = 'ITHEIMA TIME'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 获取时间戳
export const getTime = () => Cookies.get(TimeKey)

// 设置时间戳
export const setTime = () => Cookies.set(TimeKey, Date.now())
