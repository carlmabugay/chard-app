import { beforeEach, describe, expect, vi , it } from 'vitest'
import { useAuthStore } from '../presentation/stores/useAuthStore.ts'
import { LoginUser } from '../application/LoginUser.ts'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('../application/LoginUser')

describe('authStore', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('sets loading during login', async () => {
    const store = useAuthStore()

    vi.mocked(LoginUser).mockImplementation(() => ({
      execute: vi.fn().mockResolvedValue({})
    }) as any)

    const promise = store.login('a', 'b')

    expect(store.loading).toBeTruthy

    await promise

    expect(store.loading).toBeFalsy
  })

  it('sets error on failure', async () => {
    const store = useAuthStore()

    vi.mocked(LoginUser).mockImplementation(() => ({
      execute: vi.fn().mockRejectedValue(new Error())
    }) as any)

    await store.login('a', 'b')

    expect(store.error).toBe('Invalid credentials')
  })
})