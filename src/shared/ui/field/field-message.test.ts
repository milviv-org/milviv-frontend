import { describe, expect, it } from 'vitest'

import { resolveFieldMessage } from './field-message'

describe('resolveFieldMessage', () => {
  it('ошибка заменяет подсказку', () => {
    expect(resolveFieldMessage('Обязательное поле', 'До 200 символов')).toEqual({
      kind: 'error',
      text: 'Обязательное поле',
    })
  })

  it('без ошибки показывается подсказка', () => {
    expect(resolveFieldMessage(undefined, 'До 200 символов')).toEqual({
      kind: 'hint',
      text: 'До 200 символов',
    })
  })

  it('пустая строка ошибки — не ошибка', () => {
    expect(resolveFieldMessage('', 'До 200 символов')?.kind).toBe('hint')
  })

  it('ничего нет — null', () => {
    expect(resolveFieldMessage()).toBeNull()
  })
})
