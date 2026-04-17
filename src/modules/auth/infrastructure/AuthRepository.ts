import { apiClient } from '../../../shared/api/client.ts'

export class AuthRepository {

  async login(email: string, password: string) {
    const response = await apiClient.post('/user/login', {
      email,
      password,
    })

    return response.data
  }
}