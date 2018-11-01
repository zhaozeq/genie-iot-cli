import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
/* eslint-disable no-new */
export default new Vuex.Store({
  state: {
    status: 0, // 设备状态 0 - 未激活， 1 - 在线， 3 - 离线， 8 - 禁用,
    attr: {}, // 设备属性
    errorInfo: {}, // 设备上报的错误信息
    scheduleInfo: {} // 即将到来的定时，倒计时信息
  },
  mutations: { // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation, 只能同步
    /**
     * 更新状态树中的设备相关状态
     * @param {object} payload.data 新的数据
     */
    updateDeviceStatus(state, payload) {
      const { data } = payload
      const { status, attr = {}, errorInfo } = data
      if (!status) {
        console.log('error')
      }
      state.status = status
      state.attr = Object.assign({}, state.attr, attr)
      state.errorInfo = errorInfo || {}
      state.scheduleInfo = errorInfo || {}
    },
    /**
     * 更新状态树中的属性集合
     * @param {*} attr 要更新的属性集合
     */
    updateDeviceAttr(state, attr = {}) {
      state.attr = Object.assign({}, state.attr, attr)
    }
  },
  actions: {
    /**
     * 获取设备状态 
     */
    deviceStatusPolling({ commit }) {
      AI.deviceStatusPolling((data) => {
        console.log('[deviceStatusPolling]', data)
        commit('updateDeviceStatus', { data })
      }, (error) => {
        console.log('deviceStatusPolling error', error)
      })
    }
  }
})
