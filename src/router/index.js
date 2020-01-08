import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const home = () => import('@/home/index')
const my = () => import('@/my/index')
const study = () => import('@/home/study')
const lineCourse = () => import('@/lineCourse/index') // 在线课堂
const chapterList = () => import('@/lineCourse/secondPart/chapterList') // 在线课堂--章节列表
const simulationList = () => import('@/lineCourse/secondPart/simulationList') // 在线课堂--模拟列表
const specialItem = () => import('@/lineCourse/secondPart/specialItem') // 在线课堂--专项列表
const overYearsZT = () => import('@/lineCourse/secondPart/overYearsZT') // 在线课堂--历年真题列表
const xitiStatistics = () => import('@/lineCourse/secondPart/xitiStatistics') // 在线课堂--习题统计
const wrongQues = () => import('@/lineCourse/secondPart/wrongQues') // 在线课堂--错题积累
const xtcollect = () => import('@/lineCourse/secondPart/xtcollect') // 在线课堂--我的收藏
const doQuesRecord = () => import('@/lineCourse/thirdPart/doQuesRecord') // 在线课堂--做题记录
const studyReport = () => import('@/lineCourse/thirdPart/studyReport') // 在线课堂--学习报告
const myMedal = () => import('@/lineCourse/thirdPart/myMedal') // 在线课堂--我的勋章
const chapterExercise = () => import('@/lineCourse/secondPart/chapterExercise') // 在线课堂--章节列表--章节练习
const sectionCollectDetail = () => import('@/lineCourse/secondPart/collect/sectionCollectDetail') // 在线课堂--收藏--章节详情
const examCollectDetail = () => import('@/lineCourse/secondPart/collect/examCollectDetail') // 在线课堂--收藏--考试详情
const sectionErrorDetail = () => import('@/lineCourse/secondPart/wrong/sectionErrorDetail') // 在线课堂--错题--章节详情
const examErrorDetail = () => import('@/lineCourse/secondPart/wrong/examErrorDetail') // 在线课堂--错题--章节详情
// 专项练习
const specialKnowledgeInfo = () => import('@/lineCourse/secondPart/specialItem/specialKnowledgeInfo') // 在线课堂--专项练习--点击章和知识点跳转到详情

const add = () => import('@/home/add')
const nav = () => import('@/layout/navbar')
const score = () => import('@/menus/score')
const subAnalysis = () => import('@/menus/subAnalysis')
const comAnalysis = () => import('@/menus/comAnalysis_right')
const hisAnalysis = () => import('@/menus/hisAnalysis')
const question = () => import('@/menus/question')
const classSchedule = () => import('@/menus/classSchedule')
// const schoolInquire = () => import('@/school_o625/index')
const schoolInquire = () => import('@/school/schoolInquire')
const schoolInfo = () => import('@/school/schoolInfo')
const more = () => import('@/menus/more')
const addScore = () => import('@/enterGrade/index')
const addSingleSubScore = () => import('@/enterGrade/addSingleSubScore')
const share = () => import('@/share/index')
const ewm = () => import('@/components/EWeiM')
const record = () => import('@/enterGrade/record')
const examInfo = () => import('@/enterGrade/examInfo')
const collect = () => import('@/my/collect') // 我的--收藏
const setInfo = () => import('@/my/setInfo') // 我的--设置
const myInfoDetail = () => import('@/my/myInfoDetail') // 我的--我的详情
const ideaFeedback = () => import('@/my/ideaFeedback') // 我的--意见反馈
const myBBS = () => import('@/my/myBBS') // 我的--圈子
const bindAccount = () => import('@/my/bindAccount') // 我的--绑定账号
const camera = () => import('@/camera/camera') // 录入--测试相机
// const ceshiCamera = () => import('@/camera/upload') // 录入--测试lingyige相机
const test = () => import('@/components/left_right_slide')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      components: {
        default: home, nav: nav
      },
      name: 'home',
      meta: { tab: 'home', title: 'home' }
    },
    {
      path: '/addScore',
      components: {
        default: addScore
      },
      name: 'addScore',
      meta: { tab: 'addScore', title: 'addScore' }
    },
    { // 录入成绩-填写单科信息及试卷图片
      path: '/addSingleSubScore',
      components: {
        default: addSingleSubScore
      },
      name: 'addSingleSubScore',
      meta: { tab: 'addSingleSubScore', title: 'addSingleSubScore' }
    },
    {
      path: '/record',
      components: {
        default: record
      },
      name: 'record',
      meta: { tab: 'record', title: 'record' }
    },
    {
      path: '/examInfo',
      // path: '/examInfo:examName',
      components: {
        default: examInfo
      },
      name: 'examInfo',
      meta: { tab: 'examInfo', title: 'examInfo' }
    },
    {
      path: '/collect',
      components: {
        default: collect
      },
      name: 'collect',
      meta: { tab: 'collect', title: 'collect' }
    },
    {
      path: '/bindAccount', // 我的--绑定账号
      components: {
        default: bindAccount
      },
      name: 'bindAccount',
      meta: { tab: 'bindAccount', title: 'bindAccount' }
    },
    {
      path: '/myBBS', // 我的--圈子
      components: {
        default: myBBS
      },
      name: 'myBBS',
      meta: { tab: 'myBBS', title: 'myBBS' }
    },
    {
      path: '/setInfo', // 我的--设置
      components: {
        default: setInfo
      },
      name: 'setInfo',
      meta: { tab: 'setInfo', title: 'setInfo' }
    },
    {
      path: '/myInfoDetail', // 我的--我的详情
      components: {
        default: myInfoDetail
      },
      name: 'myInfoDetail',
      meta: { tab: 'myInfoDetail', title: 'myInfoDetail' }
    },
    {
      path: '/ideaFeedback', // 我的--意见反馈
      components: {
        default: ideaFeedback
      },
      name: 'ideaFeedback',
      meta: { tab: 'ideaFeedback', title: 'ideaFeedback' }
    },
    {
      path: '/my',
      components: {
        default: my, nav: nav
      },
      name: 'my',
      meta: { tab: 'my', title: 'my' }
    },
    {
      path: '/lineCourse',
      components: {
        default: lineCourse, nav: nav
      },
      name: 'lineCourse',
      meta: { tab: 'lineCourse', title: 'lineCourse' }
    },
    {
      path: '/chapterList', // 章节列表
      components: {
        default: chapterList
      },
      name: 'chapterList',
      meta: { tab: 'chapterList', title: 'chapterList' }
    },
    {
      path: '/simulationList', // 模拟列表
      components: {
        default: simulationList
      },
      name: 'simulationList',
      meta: { tab: 'simulationList', title: 'simulationList' }
    },
    {
      path: '/chapterExercise', // 章节练习
      components: {
        default: chapterExercise
      },
      name: 'chapterExercise',
      meta: { tab: 'chapterExercise', title: 'chapterExercise' }
    },
    {
      path: '/overYearsZT', // 历年真题
      components: {
        default: overYearsZT
      },
      name: 'overYearsZT',
      meta: { tab: 'overYearsZT', title: 'overYearsZT' }
    },
    {
      path: '/specialItem', // 专项列表
      components: {
        default: specialItem
      },
      name: 'specialItem',
      meta: { tab: 'specialItem', title: 'specialItem' }
    },
    {
      path: '/xitiStatistics', // 习题统计
      components: {
        default: xitiStatistics
      },
      name: 'xitiStatistics',
      meta: { tab: 'xitiStatistics', title: 'xitiStatistics' }
    },
    {
      path: '/wrongQues', // 习题统计
      components: {
        default: wrongQues
      },
      name: 'wrongQues',
      meta: { tab: 'wrongQues', title: 'wrongQues' }
    },
    {
      path: '/xtcollect', // 在线课程--我的收藏
      components: {
        default: xtcollect
      },
      name: 'xtcollect',
      meta: { tab: 'xtcollect', title: 'xtcollect' }
    },
    {
      path: '/doQuesRecord', // 在线课程--做题记录
      components: {
        default: doQuesRecord
      },
      name: 'doQuesRecord',
      meta: { tab: 'doQuesRecord', title: 'doQuesRecord' }
    },
    {
      path: '/myMedal', // 在线课程--我的勋章
      components: {
        default: myMedal
      },
      name: 'myMedal',
      meta: { tab: 'myMedal', title: 'myMedal' }
    },
    {
      path: '/studyReport', // 在线课程--学习报告
      components: {
        default: studyReport
      },
      name: 'studyReport',
      meta: { tab: 'studyReport', title: 'studyReport' }
    },
    {
      path: '/add',
      components: {
        default: add, nav: nav
      },
      name: 'add',
      meta: { tab: 'add', title: 'add' }
    },
    {
      path: '/study',
      components: {
        default: study, nav: nav
      },
      name: 'study',
      meta: { tab: 'study', title: 'study' }
    },
    {
      path: '/score',
      components: {
        default: score
      },
      name: 'score',
      meta: { tab: 'score', title: 'score' }
    },
    {
      path: '/subAnalysis',
      components: {
        default: subAnalysis
      },
      name: 'subAnalysis',
      meta: { tab: 'subAnalysis', title: 'subAnalysis' }
    },
    {
      path: '/comAnalysis',
      components: {
        default: comAnalysis
      },
      name: 'comAnalysis',
      meta: { tab: 'comAnalysis', title: 'comAnalysis' }
    },
    {
      path: '/hisAnalysis',
      components: {
        default: hisAnalysis
      },
      name: 'hisAnalysis',
      meta: { tab: 'hisAnalysis', title: 'hisAnalysis' }
    },
    {
      path: '/question',
      components: {
        default: question
      },
      name: 'question',
      meta: { tab: 'question', title: 'question' }
    },
    {
      path: '/classSchedule',
      components: {
        default: classSchedule, nav: nav
      },
      name: 'classSchedule',
      meta: { tab: 'classSchedule', title: 'classSchedule' }
    },
    { // 学校列表
      path: '/schoolInquire',
      components: {
        default: schoolInquire
      },
      name: 'schoolInquire',
      meta: { tab: 'schoolInquire', title: 'schoolInquire' }
    },
    { // 学校详情
      path: '/schoolInfo/:id/:schoolcode',
      components: {
        default: schoolInfo
      },
      name: 'schoolInfo',
      meta: { tab: 'schoolInfo', title: 'schoolInfo' }
    },
    {
      path: '/more',
      components: {
        default: more
      },
      name: 'more',
      meta: { tab: 'more', title: 'more' }
    },
    {
      path: '/share',
      // path: '/share/:exam_name',
      components: {
        default: share
      },
      name: 'share',
      meta: { tab: 'share', title: 'share' }
    },
    {
      path: '/ewm',
      // path: '/share/:exam_name',
      components: {
        default: ewm
      },
      name: 'ewm',
      meta: { tab: 'ewm', title: 'ewm' }
    },
    {
      path: '/camera', // 测试相机
      // path: '/share/:exam_name',
      components: {
        default: camera
      },
      name: 'camera',
      meta: { tab: 'camera', title: 'camera' }
    },
    // 在线课程--收藏--练习题收藏章节详情
    {
      path: '/sectionCollectDetail', // 节收藏详情
      components: {
        default: sectionCollectDetail
      },
      name: 'sectionCollectDetail',
      meta: { tab: 'sectionCollectDetail', title: 'sectionCollectDetail' }
    },
    // 在线课程--收藏--考试题收藏详情
    {
      path: '/examCollectDetail', // 每次收藏详情
      components: {
        default: examCollectDetail
      },
      name: 'examCollectDetail',
      meta: { tab: 'examCollectDetail', title: 'examCollectDetail' }
    },
    // 在线课程--错题--练习题错题章节详情
    {
      path: '/sectionErrorDetail', // 节错题详情
      components: {
        default: sectionErrorDetail
      },
      name: 'sectionErrorDetail',
      meta: { tab: 'sectionErrorDetail', title: 'sectionErrorDetail' }
    },
    // 在线课程--错题--考试题错题详情
    {
      path: '/examErrorDetail', // 错题详情
      components: {
        default: examErrorDetail
      },
      name: 'examErrorDetail',
      meta: { tab: 'examErrorDetail', title: 'examErrorDetail' }
    },
    // 专项练习
    // 在线课程--专项练习--知识点题详情
    {
      path: '/specialKnowledgeInfo', // 知识点详情
      components: {
        default: specialKnowledgeInfo
      },
      name: 'specialKnowledgeInfo',
      meta: { tab: 'specialKnowledgeInfo', title: 'specialKnowledgeInfo' }
    },
    // {
    //   path: '/ceshiCamera', // 测试相机
    //   // path: '/share/:exam_name',
    //   components: {
    //     default: ceshiCamera
    //   },
    //   name: 'ceshiCamera',
    //   meta: { tab: 'ceshiCamera', title: 'ceshiCamera' }
    // },
    {
      path: '/test',
      // path: '/share/:exam_name',
      components: {
        default: test
      },
      name: 'test',
      meta: { tab: 'test', title: 'test' }
    }
  ]
})
