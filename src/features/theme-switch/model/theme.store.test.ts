import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import { THEME_STORAGE_KEY } from './theme'
import { useThemeStore } from './theme.store'

function stubSystemTheme(dark: boolean): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' && dark,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  )
}

beforeEach(() => {
  setActivePinia(createPinia())
})

afterEach(() => {
  localStorage.clear()
  delete document.documentElement.dataset.theme
})

describe('useThemeStore', () => {
  it('по умолчанию следует системной теме', () => {
    stubSystemTheme(true)

    const store = useThemeStore()

    expect(store.preference).toBe('system')
    expect(store.theme).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('выбор пользователя сохраняется и применяется', async () => {
    stubSystemTheme(true)
    const store = useThemeStore()

    store.setPreference('light')
    await nextTick()

    expect(store.theme).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
  })

  it('мусор в хранилище не ломает тему', () => {
    stubSystemTheme(false)
    localStorage.setItem(THEME_STORAGE_KEY, 'purple')

    const store = useThemeStore()

    expect(store.preference).toBe('system')
    expect(store.theme).toBe('light')
  })
})
