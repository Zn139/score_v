const lineCourse = {
  state: {
    select_sub: '',
    levelName: '高1'
  },
  mutations: {
    SET_SELECT_SUB: (state, name) => {
      state.select_sub = name
    },
    SET_LEVEL_NAME: (state, name) => {
      state.levelName = name
    }
  }
}

export default lineCourse
