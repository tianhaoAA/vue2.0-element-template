
const navRouter = [
  {
    path: '/user',
    component: 'Layout',
    children: [
      {
        path: 'index',
        component: '/user/index',
        name: 'User',
        meta: { title: '用户', icon: 'guide', noCache: true }
      }
    ]
  }
]

export default navRouter
