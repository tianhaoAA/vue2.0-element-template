
/** ***
 *
 *  navRouter //后台返回的路由表
 *
 * **/
// 设置存储

export const SET_SESSION_STORAGE = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value))
}
// 获取存储
export const GET_SESSION_STORAGE = (name) => {
  return JSON.parse(localStorage.getItem(name))
}

// 删除存储
export const DEL_SESSION_STORAGE = (name) => {
  return localStorage.removeItem(name)
}
