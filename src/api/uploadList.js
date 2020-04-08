import request from '@/plugin/axios'

export function uploadList (data) {
  return request({
    url: '/x/upload',
    method: 'get',
    params:data,
  })
}


