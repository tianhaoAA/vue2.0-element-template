// 设置
import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme, // 主题
  showSettings: showSettings, // 右侧设置
  tagsView: tagsView, // 导航栏
  fixedHeader: fixedHeader, // 是否固定头部
  sidebarLogo: sidebarLogo // 是否显示左侧菜单
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // 判断当前对象有没有该属性
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}
// 当设置发生改变的时候
const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

