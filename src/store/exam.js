const exam = {
  state: {
    exam_name: '', // 首页选择考试名称
    score_name: '', // 选择的考试名称传给二维码名字用
    examination: '', // 录入成绩首页考试名称--考试时间 + 名称
    openid: '',
    // openid: 'o_pfhwpP_2R_kK4gzKw5SuDG0LXo',
    userImg: '',
    userName: '',
    schoolNum: '08047737', // 学号
    // singleScoreList: '', // 单科所有成绩
    singleScoreList: [], // 单科所有成绩
    enterScoreList: [], // 录入所有成绩
    subjects_list: [] // 剩余科目
  },
  // actions: {
  //   single_Score_List (ssl, ans) {
  //     ssl.commit('single_Score_List', ans)
  //   }
  // },
  mutations: {
    SET_EXAM_NAME: (state, name) => {
      state.exam_name = name
    },
    SET_SCORE_NAME: (state, name) => {
      state.exam_name = name
    },
    SET_examination: (state, name) => {
      state.examination = name
    },
    SET_SUBJECTS_LIST: (state, list) => {
      state.subjects_list = list
    },
    SET_OPENID: (state, id) => {
      state.openid = id
    },
    SET_SCHOOLNUM: (state, num) => {
      state.schoolNum = num
    },
    SET_USER_IMG: (state, img) => {
      state.userImg = img
    },
    SET_USER_NAME: (state, name) => {
      state.userName = name
    },
    single_Score_List: (state, scoreList) => {
      state.singleScoreList = scoreList
    },
    enter_Score_List: (state, scoreList) => {
      state.enterScoreList = scoreList
    }
    // single_Score_List (state, score) {
    //   state.singleScoreList = score
    // }
  }
}

export default exam
