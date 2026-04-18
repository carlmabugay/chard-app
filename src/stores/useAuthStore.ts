import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<null | { name: string; email: string }>(null)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  function setUser(data: any) {
    user.value = data
  }

  function setError(message: string | null) {
    error.value = message
  }

  function clear() {
    user.value = null
    error.value = null
  }

  return {
    user,
    error,
    isAuthenticated,
    setUser,
    setError,
    clear,
  }
})