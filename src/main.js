// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'
import vueTap from 'vue-js-tap'
import echarts from 'echarts'
import axios from 'axios'
import { Alert, AlertPlugin, XDialog, Datetime, Selector, ToastPlugin, XInput, XButton, ConfirmPlugin, LoadingPlugin, Calendar, XTable, Toast, PopupPicker, Tab, TabItem, ConfigPlugin, Confirm } from 'vux'
import store from './store'
// import Vuex from 'vuex'
import VDistpicker from 'v-distpicker'
// import uploader from 'vue-easy-uploader'
import wcView from 'wc-view'
import 'wc-view/style.css'
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
VueTouch.config.swipe = {
  threshold: 50 // 设置左右滑动的距离
}
Vue.use(wcView)
// let store = new Vuex.Store({})
// Vue.use(uploader, store)
// import $ from 'jquery'

Vue.component('v-distpicker', VDistpicker)

Vue.use(AlertPlugin)
Vue.use(VueRouter)
Vue.use(vueTap)
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX'
})
Vue.component('selector', Selector)
Vue.component('datetime', Datetime)
Vue.component('x-dialog', XDialog)
Vue.component('alert', Alert)
Vue.component('x-button', XButton)
Vue.component('x-table', XTable)
Vue.component('x-input', XInput)
Vue.component('confirm', Confirm)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('toast', Toast)
Vue.component('calendar', Calendar)
Vue.component('popup-picker', PopupPicker)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.prototype.$axios = axios
Vue.prototype.echarts = echarts
// if ('addEventListener' in document) {
//   document.addEventListener('DOMContentLoaded', function () {
//     FastClick.attach(document.body)
//   }, false)
// }
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
