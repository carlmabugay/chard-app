import { describe, vi, it, expect } from 'vitest'
import { apiClient } from '../../../shared/api/client.ts'
import { AuthRepository } from '../infrastructure/AuthRepository.ts'

vi.mock('../../../shared/api/client', () => ({
  apiClient: {
    post: vi.fn(() => Promise.resolve({ data: {} })),
  }
}))

describe('AuthRespository', () => {

  it('calls login endpoint correctly', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({
      data: { token: '123' },
    })

    const repo = new AuthRepository()

    const result = await repo.login('test@mail.com', 'password')

    expect(apiClient.post).toHaveBeenCalledWith('/user/login', {
      email: 'test@mail.com',
      password: 'password',
    })

    expect(result).toEqual({ token: '123' })
  })

})