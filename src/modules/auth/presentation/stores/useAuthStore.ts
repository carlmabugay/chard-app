import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AuthRepository } from '../../infrastructure/AuthRepository.ts'
import { LoginUser } from '../../application/LoginUser.ts'

export const useAuthStore = defineStore('auth', function () {

  const loading = ref(false)
  const error = ref('')

  async function login(email: string, password:string) {

    loading.value = true;
    error.value = '';

    try {
      const repo = new AuthRepository()
      const useCase = new LoginUser(repo)

      await useCase.execute(email, password)
    } catch (e) {
      error.value = 'Invalid credentials'
    } finally {
      loading.value = false
    }

  }

  return {
    loading,
    error,
    login
  }

});