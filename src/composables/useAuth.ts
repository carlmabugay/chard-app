import { useAuthStore } from '../stores/useAuthStore.ts'
// @ts-ignore
import { useRouter } from 'vue-router'
import { apiClient } from '../shared/api/client.ts'

export function useAuth() {
  const store = useAuthStore()
  const router = useRouter()

  const login = async (email: string, password: string) => {
    store.setError(null)

    try {
      await apiClient.get('/sanctum/csrf-cookie')

      await apiClient.post('/login', {
        email,
        password,
      })

      const { data } = await apiClient.get('/api/v1/user')

      store.setUser(data)
      router.push('/dashboard')

    } catch (err: any) {
      const status = err.response?.status

      if (status === 422) {
        store.setError('Validation error')
      } else if (status === 401) {
        store.setError('Invalid credentials')
      } else {
        store.setError('Server error')
      }
    }
  }

  const logout = async () => {
    await apiClient.post('/api/v1/user/logout')
    store.clear()
    router.push('/login')
  }

  const fetchUser = async () => {
    const { data } = await apiClient.get('/api/v1/user')
    store.setUser(data)
  }

  return { login, logout, fetchUser }
}