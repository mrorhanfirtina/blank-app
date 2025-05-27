import { useAuthStore } from 'src/stores/auth'

export default async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.checkUser && await authStore.checkUser()

  const requiresAuth = to.matched.some(record => record.path.startsWith('/app'))

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
} 