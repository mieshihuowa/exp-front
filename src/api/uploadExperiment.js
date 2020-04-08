import request from '@/plugin/axios'

export function uploadExperiment (data) {
  return request({
    url: '/x/upload/uploadExperiment',
    method: 'get',
    params:data,
  })
}
