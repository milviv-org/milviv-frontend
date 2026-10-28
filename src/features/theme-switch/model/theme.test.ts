import { describe, expect, it } from 'vitest'

import { parseThemePreference, resolveTheme } from './theme'

describe('parseThemePreference', () => {
  it('принимает известные значения', () => {
    expect(parseThemePreference('light')).toBe('light')
    expect(parseThemePreference('dark')).toBe('dark')
    expect(parseThemePreference('system')).toBe('system')
  })

  it('мусор и пустое хранилище считаются системной темой', () => {
    expect(parseThemePreference('purple')).toBe('system')
    expect(parseThemePreference(null)).toBe('system')
    expect(parseThemePreference(undefined)).toBe('system')
  })
})

describe('resolveTheme', () => {
  it('явный выбор побеждает настройку системы', () => {
    expect(resolveTheme('light', true)).toBe('light')
    expect(resolveTheme('dark', false)).toBe('dark')
  })

  it('system следует за системой', () => {
    expect(resolveTheme('system', true)).toBe('dark')
    expect(resolveTheme('system', false)).toBe('light')
  })
})
