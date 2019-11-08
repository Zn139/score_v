// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'
import vueTap from 'vue-js-tap'
import echarts from 'echarts'
import { ToastPlugin, ConfirmPlugin, LoadingPlugin, Calendar, DatetimePlugin, XTable, Toast, PopupPicker, Tab, TabItem, ConfigPlugin, Confirm } from 'vux'
import store from './store'

Vue.use(VueRouter)
Vue.use(vueTap)
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX'
})
Vue.component('x-table', XTable)
Vue.component('confirm', Confirm)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('toast', Toast)
Vue.component('calendar', Calendar)
Vue.component('popup-picker', PopupPicker)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(DatetimePlugin)
Vue.prototype.echarts = echarts
FastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
