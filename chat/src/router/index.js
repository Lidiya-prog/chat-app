import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ChatView from '../views/ChatView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/chats',
    name: 'chats',
    component: () => import(/* webpackChunkName: "about" */ '../views/ChatsView.vue')
  },
  {
    path: '/ws',
    name: 'ws',
    component: ChatView
  },
  {
    path: '/long-polling',
    name: 'longPolling',
    component: ChatView
  },
  {
    path: '/polling',
    name: 'polling',
    component: ChatView
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import(/* webpackChunkName: "about" */ '../views/ChatView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
