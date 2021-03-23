const getters = {
  sidebar: state => state.app.sidebar, //控制左侧栏
  size: state => state.app.size, //布局大小
  device: state => state.app.device, //控制屏幕大小
  visitedViews: state => state.tagsView.visitedViews, //设置导航栏
  cachedViews: state => state.tagsView.cachedViews, //是否缓存
  permission_routes: state => state.permission.routes, //路由
  errorLogs: state => state.errorLog.logs //出错的状态
}
export default getters

