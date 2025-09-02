import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import History from '@/pages/History.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/history', name: 'history', component: History },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: { template: '<h1>Not Found</h1>' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
