import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import History from '@/views/History.vue'
const UserDetails = () => import('@/views/UserDetails.vue')

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/history', name: 'history', component: History },
  { path: '/user/:id', name: 'user-details', component: UserDetails },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: { template: '<h1>Not Found</h1>' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
