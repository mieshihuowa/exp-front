import request from '@/plugin/axios'

export function delStudents (idList) {
  return request({
    url: '/x/students?idList='+idList,
    method: 'delete',
    params: idList,
  })
}

export function addStudents (data) {
  return request({
    url: '/x/students',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    dataType : "json",
    data:data
  })
}

export function editStudents (data) {
  return request({
    url: '/x/students',
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    dataType : "json",
    data:data
  })
}
