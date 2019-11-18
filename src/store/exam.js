const exam = {
  state: {
    exam_name: '',
    score_name: '',
    openid: '',
    // openid: 'o_pfhwpP_2R_kK4gzKw5SuDG0LXo',
    userImg: '',
    userName: ''
  },
  mutations: {
    SET_EXAM_NAME: (state, name) => {
      state.exam_name = name
    },
    SET_SCORE_NAME: (state, name) => {
      state.exam_name = name
    },
    SET_OPENID: (state, id) => {
      state.openid = id
    },
    SET_USER_IMG: (state, img) => {
      state.userImg = img
    },
    SET_USER_NAME: (state, name) => {
      state.userName = name
    }
  }
}

export default exam
