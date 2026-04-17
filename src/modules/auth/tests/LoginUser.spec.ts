import { describe, it, vi, expect } from 'vitest'
import { LoginUser } from '../application/LoginUser.ts'

describe('LoginUser', () => {

  it('calls repository login', async () => {

    const repo = {
      login: vi.fn().mockResolvedValue({ token: '123'})
    }

    const useCase = new LoginUser(repo as  any)

    const result = await useCase.execute('a', 'b')

    expect(repo.login).toHaveBeenCalledWith('a', 'b')
    expect(result).toEqual({ token: '123'})
  })
})