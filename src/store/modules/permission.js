import { localRoutes } from '@/router' // 本地的路由
import asyncRoutes from '@/router/permissions_router'
import { GET_SESSION_STORAGE, SET_SESSION_STORAGE, DEL_SESSION_STORAGE } from '@/utils/sessionStorage.js'
// import { resetRouter } from '@/router'
const state = {
  routes: GET_SESSION_STORAGE('navRouter') || [], //  用户权限路由列表
  addRoutes: GET_SESSION_STORAGE('addRoutes') || [], // 从后台获取的导航栏路由
  isLogin: GET_SESSION_STORAGE('login') || false // 判断用户是否登录
}

const mutations = {
  // 获取路由的信息
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // 从后台拿过来的数据如果存在的话
    state.routes = routes ? localRoutes.concat(routes) : localRoutes
    SET_SESSION_STORAGE('navRouter', state.routes)
    SET_SESSION_STORAGE('addRoutes', routes)
  },
  // 设置是否登录
  SET_COM_LOGIN: (state, params) => {
    SET_SESSION_STORAGE('login', params)
    state.isLogin = params
  },

  // 用户退出清除登陆记录 和数据
  CLEAR_ALL_THE_DATA: (state) => {
    state.routes = []
    state.isLogin = false
    DEL_SESSION_STORAGE('addRoutes')
    DEL_SESSION_STORAGE('navRouter')
    DEL_SESSION_STORAGE('login')
    // resetRouter()
  }
}

const actions = {
  // 获取路由信息
  generateRoutes({ commit }, accessedRoutes) {
    return new Promise((resolve) => {
      commit('SET_ROUTES', accessedRoutes)
      resolve()
    })
  },
  // 获取路由信息
  login({ commit }) {
    return new Promise((resolve) => {
      commit('SET_ROUTES', asyncRoutes)
      commit('SET_COM_LOGIN', true)
      resolve()
    })
  },
  // 退出
  logout({ commit, dispatch }) {
    return new Promise(resolve => {
      commit('CLEAR_ALL_THE_DATA')
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },
  // 修改路由列表
  SET_ROUTER_CHANGE: ({ commit }, addRoutes) => {
    return new Promise(resolve => {
      commit('SET_ROUTES', addRoutes)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
