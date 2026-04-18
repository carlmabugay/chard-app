// @ts-ignore
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/Dashboard.vue'
import { useAuthStore } from '../stores/useAuthStore'
import { useAuth } from '../composables/useAuth.ts'

const routes = [
  { path: '/login', component: LoginPage, meta: { guestOnly: true } },
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const store = useAuthStore()
  const { fetchUser } = useAuth()

  if (!store.user) {
    await fetchUser()
  }

  if (to.meta.requiresAuth && !store.isAuthenticated) {
    return next('/login')
  }

  if (to.meta.guestOnly && store.isAuthenticated) {
    return next('/dashboard')
  }

  next()
})

export default router