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
export function getEditEnter (req) { // 录入成绩--录入统计--编辑
  return request({
    url: 'scoreTwo/updateManuallyEnter',
    method: 'post',
    params: req
  })
}
export function getDelEnter (req) { // 录入成绩--录入统计--删除
  return request({
    url: 'scoreTwo/deleteManuallyEnter',
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
export function verificationSchoolNum (req) { // 我的--验证学号是否可以做生物题
  return request({
    url: 'exam/checkStudentNumber',
    method: 'get',
    params: req
  })
}
export function getAlllevels (req) { // 我的--得到所有年级
  return request({
    url: 'exam-three/selectgrade',
    method: 'get'
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
export function getSetTarValue (req) { // 定位对比--初始查询设定的目标
  return request({
    url: 'scoreTwo/findTargetValue',
    method: 'get',
    params: req
  })
}
// 在线课堂

export function recentExer (req) { // 在线课程--首页--获取最近练习
  return request({
    url: 'exam/continueLearn',
    method: 'get',
    params: req
  })
}
export function getChapter (req) { // 在线课程--获取年级章
  return request({
    url: 'exam/getAllChapter',
    method: 'get',
    params: req
  })
}
export function getSection (req) { // 在线课程--获取年级节
  return request({
    url: 'exam/getAllSection',
    method: 'get',
    params: req
  })
}
export function getOneSectionQues (req) { // 在线课程--获取一节题
  return request({
    url: 'exam/findExamQuestionInfo',
    method: 'get',
    params: req
  })
}
export function getCurrentRecord (req) { // 在线课程--获取当前答题记录（练习界面最下面的黄色条）
  return request({
    url: 'exam/doQuestionInfo',
    method: 'get',
    params: req
  })
}
export function getNoSelectCurrentRecord (req) { // 在线课程--获取当前答题记录（未选题时练习界面最下面的黄色条）
  return request({
    url: 'exam/getDoQuestionInfo',
    method: 'get',
    params: req
  })
}
export function collectCurrentQues (req) { // 在线课程--章节练习--收藏当前题
  return request({
    url: 'exam/insertCollect',
    method: 'get',
    params: req
  })
}
export function cancelCollectCurrentQues (req) { // 在线课程--章节练习--取消收藏当前题
  return request({
    url: 'exam/cancelCollect',
    method: 'get',
    params: req
  })
}
export function recordCurrentAnsToQues (req) { // 在线课程--章节练习--退出时--记录当次所做所有题
  return request({
    url: 'exam/fullPaperRecord',
    method: 'post',
    params: req
  })
}
export function getPreRecord (req) { // 在线课程--章节练习--进来时--记录上次所做题的情况
  return request({
    url: 'exam/echoPaperInfo',
    method: 'get',
    params: req
  })
}
export function getPreDoneRecord (req) { // 在线课程--章节练习--进来时--将用户最近做的题回显给用户
  return request({
    url: 'exam-three/echoPaperInfo',
    method: 'get',
    params: req
  })
}
export function getShowCollect (req) { // 在线课程--章节练习--进来时--某个题是否收藏过
  return request({
    url: 'exam/findCollectInfo',
    method: 'get',
    params: req
  })
}
export function getExecNum (req) { // 在线课程--错题统计--进来时--默认练习章的数量
  return request({
    url: 'exam/getChapterErrNumber',
    method: 'get',
    params: req
  })
}
export function getSectionExecNum (req) { // 在线课程--错题统计--进来时--默认练习通过章--获取节名称及数量
  return request({
    url: 'exam/getSectionErrNumber',
    method: 'get',
    params: req
  })
}
export function getSectionDetail (req) { // 在线课程--错题统计--默认练习点击章节名称获取错题详细信息
  return request({
    url: 'exam-two/getSectionErrorProblems',
    method: 'get',
    params: req
  })
}
// GET /score_analysis/exam-three/master
export function gotoMaster (req) { // 在线课程--错题统计--错题未掌握跳到已掌握
  return request({
    url: 'exam-three/master',
    method: 'get',
    params: req
  })
}
export function gotoSearch (req) { // 在线课程--错题统计--搜索
  return request({
    url: 'exam-three/wrongRecordSearch',
    method: 'get',
    params: req
  })
}
export function gotoCollectSearch (req) { // 在线课程--我的收藏--搜索
  return request({
    url: 'exam-three/queryCollect',
    method: 'get',
    params: req
  })
}
export function getMyCollectNum (req) { // 在线课程--我的收藏--进来时--默认考试和练习收藏错题
  return request({
    url: 'exam-two/getCollectProblemsNum',
    method: 'get',
    params: req
  })
}
export function getMyCollectChapExecNum (req) { // 在线课程--我的收藏--进来时--默认练习获取章的名称及数量
  return request({
    url: 'exam-two/getChapterCollectNumber',
    method: 'get',
    params: req
  })
}
export function getMyCollectSectionNum (req) { // 在线课程--我的收藏--进来时--默认练习点击章，获取节的名称及数量
  return request({
    url: 'exam-two/getSectionCollectNumber',
    method: 'get',
    params: req
  })
}
export function getMyCollectSectionDetail (req) { // 在线课程--我的收藏--根据给的章和节名称，得到该节的收藏详细信息
  return request({
    url: 'exam-two/getChapterCollectProblems',
    method: 'get',
    params: req
  })
}
export function getMyCollectExamDetail (req) { // 在线课程--我的收藏--根据给的章和节名称，得到某次考试的收藏详细信息
  return request({
    url: 'exam-two/getExamCollectProblems',
    method: 'get',
    params: req
  })
}
export function getErrorNumDetail (req) { // 在线课程--我的错题--默认得到的已掌握和未掌握各个数值
  return request({
    url: 'exam-two/getErrorProblemsNum',
    method: 'get',
    params: req
  })
}
export function getExamErrorDetail (req) { // 在线课程--我的错题--点击考试错题，显示考试错题详情
  return request({
    url: 'exam-two/getExamErrorProblems',
    method: 'get',
    params: req
  })
}
export function delMasterErrorQues (req) { // 在线课程--我的错题--已掌握错题--删除
  return request({
    url: 'exam-two/deleteMasteredQuestions',
    method: 'post',
    params: req
  })
}
export function notMasterToMaster (req) { // 在线课程--我的错题--未掌握错题做对进入已掌握
  return request({
    url: 'exam-two/doNotMasteredQuestions',
    method: 'post',
    params: req
  })
}
// 在线课程--专项练习 GET /score_analysis/exam-three/questionsearch

export function searchPoint (req) { // 在线课程--专项练习--根据章节获取知识点数
  return request({
    url: 'exam-three/questionsearch',
    method: 'get',
    params: req
  })
}export function getKnowledgeNumByChapter (req) { // 在线课程--专项练习--根据章节获取知识点数
  return request({
    url: 'exam-two/getQuestionsNumsByChapter',
    method: 'get',
    params: req
  })
}
export function getKnowledgeNum (req) { // 在线课程--专项练习--根据章节获取知识点数
  return request({
    url: 'exam-two/getQuestionsNumsByAttributr',
    method: 'get',
    params: req
  })
}
export function getKnowledgeInfo (req) { // 在线课程--专项练习--根据章节和知识点获取知识点详情
  return request({
    url: 'exam-two/getQuestionsByQuestionsAttribute',
    method: 'get',
    params: req
  })
}
// 做题记录
export function getXTStaticInfo (req) { // 在线课程--做题统计
  return request({
    url: 'exam-two/getDoQuestionRecord',
    method: 'get',
    params: req
  })
}
export function getXTStaticDetail (req) { // 在线课程--做题统计--点击获取做题详情
  return request({
    url: 'exam-two/getDoQuestionRecordDetail',
    method: 'get',
    params: req
  })
}
// 学习记录
export function getBasicInfo (req) { // 在线课程--学习记录--得到基本信息
  return request({
    url: 'exam-two/getPracticeRecord',
    method: 'get',
    params: req
  })
}
export function getDoQuesInfo (req) { // 在线课程--学习记录--做题情况
  return request({
    url: 'exam-two/getDoQuestionsCount',
    method: 'get',
    params: req
  })
}
export function getDoQuesTiming (req) { // 在线课程--学习记录--做题时长和正确率
  return request({
    url: 'exam-two/getRightRateAndClassHours',
    method: 'get',
    params: req
  })
}
export function getCollectError (req) { // 在线课程--学习记录--错题和收藏图表数据
  return request({
    url: 'exam-two/getWrongCollectQuestionsCount',
    method: 'get',
    params: req
  })
}
// 错题记录
export function getWrongRecord (req) { // 在线课程--错题记录--获取所有分类的名称及数量
  return request({
    url: 'exam/getClassificationQuantity',
    method: 'get',
    params: req
  })
}
export function getClassifyDetail (req) { // 在线课程--错题记录--获取某个分类下的题
  return request({
    url: 'exam/getNotMasteredInfo',
    method: 'get',
    params: req
  })
}
export function getClassifyClassify (req) { // 在线课程--错题记录--获取某个分类下具体的分类情况
  return request({
    url: 'exam/getClassification',
    method: 'get',
    params: req
  })
}
export function getErrorDetail (req) { // 在线课程--错题记录--错题跳转到详情
  return request({
    url: 'exam/getQuestionInfo',
    method: 'get',
    params: req
  })
}
// 在线课程--专项练习--获取所有的知识点
export function getAllKnowledge (req) { // 在线课程--专项练习--获取所有的知识点
  return request({
    url: 'exam/getAllKnowledge',
    method: 'get',
    params: req
  })
}
export function getKnowledgeDetail (req) { // 在线课程--专项练习--获取某个知识点详情
  return request({
    url: 'exam/getAllQuestionByPoint',
    method: 'get',
    params: req
  })
}
export function commitKnowledgeDoRecord (req) { // 在线课程--专项练习--获取某个知识点详情
  return request({
    url: 'exam/specialRecordId',
    method: 'post',
    params: req
  })
}
// 模拟考试 GET /score_analysis/exam/getAllExamName
export function getMockexamName (req) { // 在线课程--模拟考试--获取考试名称和题数
  return request({
    url: 'exam/getAllExamName',
    method: 'get',
    params: req
  })
}
// POST /score_analysis/exam-three/examsubmit
export function getMockSubmit (req) { // 在线课程--模拟考试--做完题之后点击提交的值
  return request({
    url: 'exam-three/examsubmit',
    method: 'post',
    params: req
  })
}
// GET /score_analysis/exam/getcollectClassifyQuantity
export function getcollectClassifyQuantity (req) { // 在线课程--我的收藏--获取分类名称和数量
  return request({
    url: 'exam/getcollectClassifyQuantity',
    method: 'get',
    params: req
  })
}
export function getcollectMasteredInfo (req) { // 在线课程--我的收藏--获取分类题详情
  return request({
    url: 'exam/getcollectMasteredInfo',
    method: 'get',
    params: req
  })
}
