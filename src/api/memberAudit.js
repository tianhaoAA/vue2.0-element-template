import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin/memberAudit/list',
    method: 'get',
    params: query
  })
}
