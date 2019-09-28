import Vue from 'vue'
import Vuex from 'vuex'
import sunchart from './sunchart'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sunchart
  }
})

export default store
