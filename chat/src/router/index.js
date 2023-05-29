import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/chats',
    name: 'chats',
    component: () => import('../views/ChatsView.vue')
  },
  {
    path: '/ws',
    name: 'ws',
    component: () => import('../views/ChatView.vue')
  },
  {
    path: '/long-polling',
    name: 'longPolling',
    component: () => import('../views/ChatView.vue')
  },
  {
    path: '/polling',
    name: 'polling',
    component: () => import('../views/ChatView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
