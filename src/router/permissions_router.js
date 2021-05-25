
const navRouter = [
  {
    path: '/distribution',
    component: 'Layout',
    children: [
      {
        path: 'extension',
        component: '/distribution/extension',
        name: 'extension',
        meta: { title: '推广统计', icon: 'guide', noCache: true }
      },
      {
        path: 'memberAudit',
        component: '/distribution/memberAudit',
        name: 'memberAudit',
        meta: { title: '成员审核', icon: 'guide', noCache: true }
      },
      {
        path: 'memberAdministration',
        component: '/distribution/memberAdministration',
        name: 'memberAdministration',
        meta: { title: '成员管理', icon: 'guide', noCache: true }
      }

    ],
    meta: { title: '分销管理', icon: 'guide', noCache: true }
  },
  {
    path: '/finance',
    component: 'Layout',
    children: [
      {
        path: 'declarationQuery',
        name: 'declarationQuery',
        component: '/finance/declarationQuery',
        meta: { title: '报单查询', icon: 'skill', noCache: true }
      },
      {
        path: 'withdrawalInquiry',
        name: 'withdrawalInquiry',
        component: '/finance/withdrawalInquiry',
        meta: { title: '提现查询', icon: 'skill', noCache: true }
      }
    ],
    meta: { title: '财务管理', icon: 'skill', noCache: true }
  }

]

export default navRouter
