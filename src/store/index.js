import Vue from 'vue'
import Vuex from 'vuex'
import exam from './exam'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    exam
  }
})

export default store
