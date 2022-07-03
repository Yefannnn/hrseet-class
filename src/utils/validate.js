/**
 * Created by PanJiaChen on 16/11/18.
 */
import { getTime } from '@/utils/auth'
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function validMobile(str) {
  return /^1[3-9]\d{9}$/.test(str) // 校验手机号
}

// 定义检查token是否超时的方法
export function IsCheckTimeOut(TimeOut) {
  // 现在
  const currentTime = Date.now()
  // 过去
  const timeStamp = getTime()
  return (currentTime - timeStamp) / 1000 > TimeOut
  // 如果是true 说明已经超时 ，false表示没有超时
}
