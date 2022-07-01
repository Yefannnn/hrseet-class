
// Vuex---用户user模块
import { getToken, setToken, removeToken } from '@/utils/auth'
// 引入请求方法
import { userloginAPI } from '@/api/index'
import { Message } from 'element-ui'
const state = {
  token: getToken() // 获取本地的token值
}

const mutations = {
  updateToken(state, token) {
    // 判断token是否有值  有值就更新state和本地的token值  没有的话就删除token
    token ? state.token = token && setToken(token) : state.token = null && removeToken()
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
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state
}
