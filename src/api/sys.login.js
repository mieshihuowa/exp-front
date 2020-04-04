import request from '@/plugin/axios'

// export function AccountLogin (data) {
//   return request({
//     url: '/login',
//     method: 'post',
//     data
//   })
// }

export function students (sno) {
  return request({
    url: '/x/students',
    method: 'get',
    params:sno,
  })
}

export function AccountLogin (data) {
  return request({
    url: '/x/students/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    dataType : "json",
    data:data
  })
}

