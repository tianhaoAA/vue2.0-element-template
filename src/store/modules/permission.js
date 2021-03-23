import router,{  constantRoutes } from '@/router'
import asyncRoutes from '@/router/permissions_router'


import { GET_SESSION_STORAGE, SET_SESSION_STORAGE } from "@/utils/sessionStorage.js";


const state = {
  routes: GET_SESSION_STORAGE("navRouter") || [], //本地的路由信息
  addRoutes: [], //后面添加的路由信息
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)

    SET_SESSION_STORAGE("navRouter", state.routes)
    router.addRoutes(state.routes)
    console.log('全部的路由',state.routes);
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      let accessedRoutes =asyncRoutes || []
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
