import request from '@/plugin/axios'

export function delUser (idList) {
  return request({
    url: '/x/user?idList='+idList,
    method: 'delete',
    params: idList,
  })
}

export function addUser (data) {
  return request({
    url: '/x/user',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    dataType : "json",
    data:data
  })
}

export function editUser (data) {
  return request({
    url: '/x/user',
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    dataType : "json",
    data:data
  })
}
