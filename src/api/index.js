import request from '@/utils/request'

export function getScoreAnalysis (req) {
  return request({
    url: 'score/getExamCoversionTotalInfo',
    method: 'get',
    params: req
  })
}
export function getThree (req) {
  return request({
    url: 'score/getExamCoversionTotalSectionInfo',
    method: 'get',
    params: req
  })
}
export function getSingle (req) {
  return request({
    url: 'score/getExamCoversionTotalSingleInfo',
    method: 'get',
    params: req
  })
}
export function getAllRate (req) {
  return request({
    url: 'score/getAsahiChartAllRate',
    method: 'get',
    params: req
  })
}