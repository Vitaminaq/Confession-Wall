// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuet from './vuet'
import App from './App'
import router from './router'
// import axios from 'axios'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// Vue.prototype.$axios = axios
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import VueScroller from 'vue-scroller'
Vue.use(Toast, {
  defaultType: 'bottom',
  duration: 1000,
  wordWrap: true,
  width: '170px'
})
Vue.use(VueScroller)

// router.beforeEach((to, from, next) => {
//  console.log(to.path, from.path)
//  if (to.path === '/chatroom' && from.path === '/detail') {
//  	document.getElementById('app').scrollTop = 100
//  }
//  next()
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuet,
  router,
  components: { App },
  template: '<App/>'
})
