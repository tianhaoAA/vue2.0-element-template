import router, { constantRoutes } from '@/router'
import asyncRoutes from '@/router/permissions_router'

import { GET_SESSION_STORAGE, SET_SESSION_STORAGE, DEL_SESSION_STORAGE } from '@/utils/sessionStorage.js'
import { resetRouter } from '@/router'
const state = {
  routes: GET_SESSION_STORAGE('navRouter') || [], // 本地的路由信息
  addRoutes: [], // 后面添加的路由信息
  isLogin: GET_SESSION_STORAGE('login') || false // 判断用户是否登录
}

const mutations = {
  // 获取路由的信息
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    SET_SESSION_STORAGE('navRouter', state.routes)
    router.addRoutes(state.routes)
    console.log('全部的路由', state.routes)
  },
  // 设置是否登录
  SET_COM_LOGIN: (state, params) => {
    SET_SESSION_STORAGE('login', params)
    state.isLogin = params
    console.log()
  },
  // 用户退出清除登陆记录 和数据
  CLEAR_ALL_THE_DATA: (state) => {
    state.routes = []
    state.isLogin = false
    DEL_SESSION_STORAGE('navRouter')
    DEL_SESSION_STORAGE('login')
    resetRouter()
    console.log('退出方法执行了')
  }
}

const actions = {
  // 获取路由信息
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      const accessedRoutes = asyncRoutes || []
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_COM_LOGIN', true)
      resolve(accessedRoutes)
    })
  },
  // 退出
  logout({ commit }) {
    return new Promise(resolve => {
      commit('CLEAR_ALL_THE_DATA')
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
