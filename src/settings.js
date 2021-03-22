module.exports = {
  title: 'Vue2.0 Element template', // 标题
  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true, // 是否显示侧边栏设置

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true, // 导航栏

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false, // 是否固定头部

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false, // 是否显示左侧菜单图标

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'development'
}
