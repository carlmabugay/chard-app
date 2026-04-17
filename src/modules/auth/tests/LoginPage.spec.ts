import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import LoginPage from '../presentation/pages/LoginPage.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '../presentation/stores/useAuthStore.ts'

describe('Login Page', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders email, password and login button', () => {
    render(LoginPage)

    expect(screen.getByPlaceholderText('Email')).toBeTruthy
    expect(screen.getByPlaceholderText('Password')).toBeTruthy
    expect(screen.getByText('Login')).toBeTruthy
  });

  it('updates input values', async () => {
    render(LoginPage)

    const email = screen.getByPlaceholderText('Email')
    const password = screen.getByPlaceholderText('Password')

    await fireEvent.update(email, 'test@mail.com')
    await fireEvent.update(password, 'password')

    expect((email as HTMLInputElement).value).toBe('test@mail.com')
    expect((password as HTMLInputElement).value).toBe('password')
  })

  it('calls store login on submit', async () => {
    const store = useAuthStore()
    const spy = vi.spyOn(store, 'login').mockResolvedValue()

    render(LoginPage)

    await fireEvent.update(screen.getByPlaceholderText('Email'), 'test@mail.com')
    await fireEvent.update(screen.getByPlaceholderText('Password'), 'password')

    await fireEvent.click(screen.getByText('Login'))

    expect(spy).toHaveBeenCalledWith('test@mail.com', 'password')
  })

  it('disables button while loading', () => {
    const store = useAuthStore()
    store.loading = true

    render(LoginPage)

    const button = screen.getByText('Login') as HTMLButtonElement

    expect(button.disabled).toBe(true)
  })

  it('shows error message', async () => {
    const store = useAuthStore()
    store.error = 'Invalid credentials'

    render(LoginPage)

    expect(screen.getByText('Invalid credentials')).toBeTruthy
  })

})