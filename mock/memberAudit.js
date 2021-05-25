/** *
 * 分销管理
 * **/

const Mock = require('mockjs')

const Random = Mock.Random
const List = []

const count = 100
Mock.Random.extend({

  phone: function() {
    var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) // Number()
  }
})
for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        name: Random.cname(),
       city: '@city',
      phone: '@phone',
      date: Random.date()

    }))
}

module.exports = [
    {
        url: '/admin/memberAudit/list',
        type: 'get',
        response: config => {
          const { importance, type, title, page = 1, limit = 20, sort } = config.query

          let mockList = List.filter(item => {
            if (importance && item.importance !== +importance) return false
            if (type && item.type !== type) return false
            if (title && item.title.indexOf(title) < 0) return false
            return true
          })

          if (sort === '-id') {
            mockList = mockList.reverse()
          }

          const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

          return {
            code: 20000,
            data: {
              total: mockList.length,
              items: pageList
            }
          }
        }
  }

]

