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
    { path: '/', name: 'login', component: login, meta: { keepAlive: false } },
    { path: '/register', name: 'register', component: register, meta: { keepAlive: false } },
    { path: '/chatroom', name: 'chatroom', component: chatroom, meta: { keepAlive: true } },
    { path: '/detail', name: 'detail', component: detail, meta: { keepAlive: false } },
    { path: '/publish', name: 'publish', component: publish, meta: { keepAlive: false } },
    { path: '/reset', name: 'reset', component: reset, meta: { keepAlive: false } }
  ]
})
