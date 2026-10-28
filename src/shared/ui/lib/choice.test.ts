import { describe, expect, it } from 'vitest'

import { findOption } from './choice'

const OPTIONS = [
  { value: 'day', label: 'День' },
  { value: 'week', label: 'Неделя', disabled: true },
] as const

describe('findOption', () => {
  it('находит вариант по значению', () => {
    expect(findOption(OPTIONS, 'day')).toBe(OPTIONS[0])
  })

  it('не находит отключённый вариант', () => {
    expect(findOption(OPTIONS, 'week')).toBeUndefined()
  })

  it('не находит значение не из списка и значение другого типа', () => {
    expect(findOption(OPTIONS, 'month')).toBeUndefined()
    expect(findOption(OPTIONS, 1)).toBeUndefined()
    expect(findOption(OPTIONS, null)).toBeUndefined()
  })
})
