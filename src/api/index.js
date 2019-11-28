import request from '@/utils/request'

export function getScoreAnalysis (req) {
  return request({
    url: 'score/getExamCoversionTotalInfo',
    method: 'get',
    params: req
  })
}
export function getThree (req) { // 自选的三科
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
export function getScoreReport (req) {
  return request({
    url: 'score/getScoreReportInfo',
    method: 'get',
    params: req
  })
}
export function getSubjectAnalysisInfo (req) {
  return request({
    url: 'score/getSubjectAnalysisInfo',
    method: 'get',
    params: req
  })
}
export function getAllExam () {
  return request({
    url: 'score/getListExamInfols',
    method: 'get'
  })
}
export function enterGrade (req) { // 录入成绩
  return request({
    url: 'scoreTwo/save',
    method: 'post',
    params: req
  })
}
// export function enterGradeList (req) { // 最后提交录入成绩单
//   console.log('hahahahahhahahahahah', [JSON.stringify(req)])
//   console.log('hahahahahhahahahahah', typeof req[0])
//   return request({
//     url: 'scoreTwo/saveList',
//     method: 'POST',
//     contentType: 'application/json; charset=utf-8',
//     // contentType: 'application/x-www-form-urlencoded',
//     // data: req
//     data: JSON.stringify(req),
//     dataType: 'json'
//   })
// }
export function enterGradeList (req) { // 最后提交录入成绩单
  // console.log('hahahahahhahahahahah', [JSON.stringify(req)])
  // console.log('hahahahahhahahahahah', typeof req[0])
  return request({
    url: 'scoreTwo/saveList2',
    method: 'POST',
    contentType: 'application/json; charset=utf-8',
    // contentType: 'application/x-www-form-urlencoded',
    // data: req
    data: [JSON.stringify(req)],
    dataType: 'json'
  })
}
export function hisCountAnal (req) { // 历史分析--总分分析
  return request({
    url: 'score/getHistoricalAnalysisTotalInfo',
    method: 'get',
    params: req
  })
}
export function hisSingleAnal (req) { // 历史分析--单科分析
  return request({
    url: 'score/getHistoricalAnalysisSingleInfo',
    method: 'get',
    params: req
  })
}
export function getYears (req) { // 录入成绩--录入统计--年
  return request({
    url: 'scoreTwo/getYearList',
    method: 'get',
    params: req
  })
}
export function getMonths (req) { // 录入成绩--录入统计--月
  return request({
    url: 'scoreTwo/getMonthByYearList',
    method: 'get',
    params: req
  })
}
export function getExamName (req) { // 录入成绩--录入统计--获取名称
  return request({
    url: 'scoreTwo/getExamNameByYearMonthList',
    method: 'get',
    params: req
  })
}
export function getExamInfo (req) { // 录入成绩--录入统计--获取一条信息
  return request({
    url: 'scoreTwo/findAll',
    method: 'get',
    params: req
  })
}
export function feedBack (req) { // 我的--反馈
  return request({
    url: 'user/addUserFeedBack',
    method: 'post',
    params: req
  })
}
export function positionCompare (req) { // 定位对比--定位
  return request({
    url: 'score/getSixRateInfo',
    method: 'get',
    params: req
  })
}
export function getChaju (req) { // 定位对比--差距
  return request({
    url: 'scoreTwo/getGapValue',
    method: 'get',
    params: req
  })
}
export function getEachScore (req) { // 定位对比--分数
  return request({
    url: 'scoreTwo/getCommentValue',
    method: 'get',
    params: req
  })
}
export function getSelectSub (req) { // 定位对比--所选科目
  return request({
    url: 'scoreTwo/getSubjectCollection',
    method: 'get',
    params: req
  })
}
export function getSubCompare (req) { // 定位对比--选完科目的对比信息获取
  return request({
    url: 'scoreTwo/getSingleContrastInfo',
    method: 'get',
    params: req
  })
}
