import { createRouter, createWebHistory } from 'vue-router'

// Auth views
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import ForgetView from '@/views/auth/ForgetView.vue'

// Dashboard views
import HomeView from '@/views/dashboard/HomeView.vue'
import HistoryView from '@/views/dashboard/HistoryView.vue'
import StatisticsView from '@/views/dashboard/StatisticsView.vue'
import ProfileView from '@/views/dashboard/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/forget',
    name: 'Forget',
    component: ForgetView
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: StatisticsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/history',
    name: 'History',
    component: HistoryView,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Exemple guard simple (à remplacer par ta logique auth réelle)
router.beforeEach((to, _from, next) => {
  const isAuthenticated = true // ici tu mettras un store ou localStorage check

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router