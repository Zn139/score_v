const lineCourse = {
  state: {
    select_sub: '',
    levelName: '',
    if_master: -1
  },
  mutations: {
    SET_SELECT_SUB: (state, name) => {
      state.select_sub = name
    },
    SET_LEVEL_NAME: (state, name) => {
      state.levelName = name
    },
    SET_IF_MASTER: (state, val) => {
      state.if_master = val
    }
  }
}

export default lineCourse
