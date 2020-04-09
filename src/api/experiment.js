import request from '@/plugin/axios'

export function experiment (data) {
  return request({
    url: '/x/experiment',
    method: 'get',
    params:data,
  })
}

export function delExperiment (idList) {
  return request({
    url: '/x/experiment?idList='+idList,
    method: 'delete',
    params: idList,
  })
}

export function noPubExperiment (sno) {
  return request({
    url: '/x/experiment/noPubExperiment?sno='+sno,
    method: 'get',
  })
}

export function noPubStudens (data) {
  return request({
    url: '/x/experiment/noPubStudents?size=1000',
    method: 'get',
    Params:data
  })
}

export function addExperiment (data) {
  return request({
    url: '/x/experiment',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    dataType : "json",
    data:data
  })
}

export function editExperiment (data) {
  return request({
    url: '/x/experiment',
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    dataType : "json",
    data:data
  })
}
