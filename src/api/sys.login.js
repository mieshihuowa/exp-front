import request from '@/plugin/axios'

// export function AccountLogin (data) {
//   return request({
//     url: '/login',
//     method: 'post',
//     data
//   })
// }

export function user (sno) {
  return request({
    url: '/x/user',
    method: 'get',
    params:sno,
  })
}

export function AccountLogin (data) {
  return request({
    url: '/x/user/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    dataType : "json",
    data:data
  })
}

