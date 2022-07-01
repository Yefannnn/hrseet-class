
// Vuex---用户user模块
import { getToken, setToken, removeToken } from '@/utils/auth'
// 引入请求方法
import { userloginAPI, getUserInfoAPI, getUserDetailByIdAPI } from '@/api'
import { Message } from 'element-ui'
const state = {
  token: getToken(), // 获取本地的token值
  userinfo: {}
}

const mutations = {
  updateToken(state, token) {
    // 判断token是否有值  有值就更新state和本地的token值  没有的话就删除token
    token ? (state.token = token, setToken(token)) : (state.token = null, removeToken())
  },

  // 设置userinfo
  updateUserInfo(state, value) {
    value ? state.userinfo = { ...value } : state.userinfo = {}
  }
}
const actions = {
  async login(context, data) {
    try {
      const res = await userloginAPI(data)
      context.commit('updateToken', res.data)
    } catch (error) {
      Message.error(error.message)
    }
  },
  async getUserInfo(context) {
    try {
      // console.log(context)
      const { data } = await getUserInfoAPI()
      const { data: userinfodata } = await getUserDetailByIdAPI(data.userId)
      const baseUserInfo = { ...data, ...userinfodata }
      context.commit('updateUserInfo', baseUserInfo)
      return baseUserInfo
    } catch (error) {
      console.log(error)
    }
  },
  // 登出操作
  logout(context) {
    context.commit('updateToken')
    context.commit('updateUserInfo')
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state
}
