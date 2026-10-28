import { describe, expect, it } from 'vitest'

import { shouldApplyOpenChange } from './dismiss'

describe('shouldApplyOpenChange', () => {
  it('открытие принимается всегда', () => {
    expect(shouldApplyOpenChange(true, true)).toBe(true)
    expect(shouldApplyOpenChange(true, false)).toBe(true)
  })

  it('закрытие принимается, только если слой можно закрыть', () => {
    expect(shouldApplyOpenChange(false, true)).toBe(true)
    expect(shouldApplyOpenChange(false, false)).toBe(false)
  })
})
