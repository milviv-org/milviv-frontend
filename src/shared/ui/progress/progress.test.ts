import { describe, expect, it } from 'vitest'

import { toFraction, toPercent } from './progress'

describe('toFraction', () => {
  it('оставляет значение внутри 0…1 как есть', () => {
    expect(toFraction(0.58)).toBe(0.58)
  })

  it('ограничивает выход за границы', () => {
    expect(toFraction(-0.2)).toBe(0)
    expect(toFraction(1.4)).toBe(1)
  })

  it('NaN и бесконечность — нет прогресса', () => {
    expect(toFraction(Number.NaN)).toBe(0)
    expect(toFraction(Number.POSITIVE_INFINITY)).toBe(0)
  })
})

describe('toPercent', () => {
  it('округляет до целого и ограничивает', () => {
    expect(toPercent(7 / 12)).toBe(58)
    expect(toPercent(2)).toBe(100)
  })
})
