import Vue from 'vue'
import Vuex from 'vuex'
import exam from './exam'
import lineCourse from './lineCourse'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    exam,
    lineCourse
  }
})

export default store
