import Vue from 'vue'
import Vuet from 'vuet'
import VuetRoute from 'vuet-route'
import chatroom from './chatroom'
import detail from './detail'
import VuetScroll from 'vuet-scroll'
// import http from '../common/http'
import comjs from '../common/comjs'
import axios from 'axios'
 
Vue.use(Vuet)
   .use(VuetScroll)
Vuet
  .rule('route', VuetRoute)

export default new Vuet({
  pathJoin: '-',
  modules: {
    page: {
      modules: {
        chatroom: chatroom,
        detail: detail
      }
    }
  }
})

