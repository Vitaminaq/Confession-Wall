import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import chatroom from '@/components/chatroom'
import detail from '@/components/detail'
import publish from '@/components/publish'
import reset from '@/components/reset'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'login', component: login },
    { path: '/register', name: 'register', component: register },
    { path: '/chatroom', name: 'chatroom', component: chatroom },
    { path: '/detail', name: 'detail', component: detail },
    { path: '/publish', name: 'publish', component: publish },
    { path: '/reset', name: 'reset', component: reset }
  ]
})
