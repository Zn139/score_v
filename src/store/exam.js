const exam = {
  state: {
    exam_name: ''
  },
  mutations: {
    SET_EXAM_NAME: (state, name) => {
      state.exam_name = name
    }
  }
}

export default exam
