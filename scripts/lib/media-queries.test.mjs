import { describe, expect, it } from 'vitest'

import {
  buildMediaQueries,
  readBreakpoints,
  renderCustomMediaCss,
  renderMediaQueriesTs,
} from './media-queries.mjs'

const BREAKPOINTS = [
  { name: 'tablet', px: 768 },
  { name: 'mobile', px: 375 },
  { name: 'wide', px: 1440 },
  { name: 'desktop', px: 1024 },
]

describe('buildMediaQueries', () => {
  const queries = buildMediaQueries(BREAKPOINTS)

  it('строит диапазон точки и «от точки и шире», в порядке возрастания', () => {
    expect(queries).toEqual([
      { name: 'mobile', query: '(width < 768px)' },
      { name: 'tablet', query: '(768px <= width < 1024px)' },
      { name: 'tablet-up', query: '(width >= 768px)' },
      { name: 'desktop', query: '(1024px <= width < 1440px)' },
      { name: 'desktop-up', query: '(width >= 1024px)' },
      { name: 'wide', query: '(width >= 1440px)' },
    ])
  })

  it('у последней точки нет дубля -up: её диапазон и так открыт сверху', () => {
    expect(queries.some(({ name }) => name === 'wide-up')).toBe(false)
  })

  it('одна точка — запросов нет: делить нечего', () => {
    expect(buildMediaQueries([{ name: 'mobile', px: 375 }])).toEqual([])
  })
})

describe('readBreakpoints', () => {
  it('убирает префикс bp- и переводит в числа', () => {
    const tokens = { breakpoint: { tokens: [{ name: 'bp-tablet', value: '768px' }] } }

    expect(readBreakpoints(tokens)).toEqual([{ name: 'tablet', px: 768 }])
  })

  it('отказывается от единиц кроме px: медиазапросы и JS должны считать одинаково', () => {
    const tokens = { breakpoint: { tokens: [{ name: 'bp-tablet', value: '48rem' }] } }

    expect(() => readBreakpoints(tokens)).toThrow('bp-tablet')
  })
})

describe('рендер', () => {
  const queries = buildMediaQueries(BREAKPOINTS)

  it('CSS и TS получают одинаковые строки запросов', () => {
    const css = renderCustomMediaCss(queries)
    const ts = renderMediaQueriesTs(BREAKPOINTS, queries)

    expect(css).toContain('@custom-media --mv-desktop-up (width >= 1024px);')
    expect(ts).toContain("  DesktopUp: '(width >= 1024px)',")
    expect(css).toContain('@custom-media --mv-mobile (width < 768px);')
    expect(ts).toContain("  Mobile: '(width < 768px)',")
  })

  it('TS содержит точки по возрастанию', () => {
    const ts = renderMediaQueriesTs(BREAKPOINTS, queries)

    expect(ts).toMatch(/Mobile: 375,\n {2}Tablet: 768,\n {2}Desktop: 1024,\n {2}Wide: 1440,/)
  })
})
