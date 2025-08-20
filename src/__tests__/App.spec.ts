import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import router from '../router'
import App from '../App.vue'

describe('App', () => {
  it('renders navigation links', async () => {
    router.push('/')
    await router.isReady()

    const pinia = createPinia()
    const wrapper = mount(App, {
      global: {
        plugins: [pinia, router],
      },
    })

    const linkTexts = wrapper
      .findAll('nav a')
      .map((a) => a.text())
    expect(linkTexts).toContain('Login')
    expect(linkTexts).toContain('Register')
    expect(linkTexts).toContain('Recipes')
  })
})
