import { describe, expect, it } from 'vitest'

import { findRawSizeQueries, isMissingMediaImport } from './media-rules.mjs'

describe('findRawSizeQueries', () => {
  it('находит числа в запросах по ширине и высоте в любом синтаксисе', () => {
    const css = `@media (max-width: 767px) { .a {} }
      @media (width >= 1024px) and (min-height: 600px) { .b {} }`

    expect(findRawSizeQueries(css)).toEqual([
      '(max-width: 767px)',
      '(width >= 1024px) and (min-height: 600px)',
    ])
  })

  it('пропускает именованные запросы, запросы без размеров и комментарии', () => {
    const css = `/* @media (min-width: 1px) */
      @media (--mv-desktop-up) { .a {} }
      @media (prefers-reduced-motion: reduce) { .b {} }
      @media (hover: none) { .c {} }`

    expect(findRawSizeQueries(css)).toEqual([])
  })
})

describe('isMissingMediaImport', () => {
  it('ошибка: --mv-* без подключения media.css', () => {
    expect(isMissingMediaImport('@media (--mv-mobile) { .a {} }')).toBe(true)
  })

  it('норма: подключение есть', () => {
    const css = `@import '@/shared/styles/media.css';\n@media (--mv-mobile) { .a {} }`

    expect(isMissingMediaImport(css)).toBe(false)
  })

  it('норма: --mv-* не используется', () => {
    expect(isMissingMediaImport('.a { color: red; }')).toBe(false)
  })
})
