import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const home = () => import('@/home/index')
const my = () => import('@/my/index')
const study = () => import('@/home/study')
const lineCourse = () => import('@/home/lineCourse')
const add = () => import('@/home/add')
const nav = () => import('@/layout/navbar')
const score = () => import('@/menus/score')
const subAnalysis = () => import('@/menus/subAnalysis')
const comAnalysis = () => import('@/menus/comAnalysis_right')
const hisAnalysis = () => import('@/menus/hisAnalysis')
const question = () => import('@/menus/question')
const classSchedule = () => import('@/menus/classSchedule')
// const schoolInquire = () => import('@/school/index')
const schoolInquire = () => import('@/menus/schoolInquire')
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
const test = () => import('@/menus/test')

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
      path: '/examInfo:examName',
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
    {
      path: '/schoolInquire',
      components: {
        default: schoolInquire
      },
      name: 'schoolInquire',
      meta: { tab: 'schoolInquire', title: 'schoolInquire' }
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
