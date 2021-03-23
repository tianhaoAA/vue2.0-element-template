import Layout from '@/layout'
import user  from '@/views/user'
const navRouter = [
    {
        path: '/user',
        component: Layout,
        redirect: '/user/index',
        children: [
          {
            path: 'index',
            component: user,
            name: 'User',
            meta: { title: '用户', icon: 'guide' }
          }
        ]
      }
]

export default navRouter;