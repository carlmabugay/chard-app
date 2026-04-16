import { describe, it, expect} from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import Counter from '../App.vue'
import { createPinia } from 'pinia'


describe('Counter Component', () => {

  it('increments count when button is clicked', async () => {
    render(Counter, {
      global: {
        plugins: [createPinia()],
      }
    })

    expect(screen.getByText('0')).toBeInTheDocument()

    await fireEvent.click(
      screen.getByRole('button', { name: '+'})
    )

    expect(screen.getByText('1')).toBeInTheDocument()
  })

});