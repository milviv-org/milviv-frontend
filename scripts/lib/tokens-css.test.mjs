import { describe, expect, it } from 'vitest'

import { renderTokensCss } from './tokens-css.mjs'

const flat = (name, value) => ({ tokens: [{ name, value }] })

const TOKENS = {
  color: {
    themes: [{ id: 'light' }, { id: 'dark' }],
    tokens: [{ name: 'color-bg', value: { light: '#fff', dark: '#000' } }],
  },
  shadow: { tokens: [{ name: 'shadow-1', value: { light: 'a', dark: 'b' } }] },
  type: {
    families: { sans: 'Manrope, sans-serif' },
    groups: [
      {
        family: 'sans',
        styles: [
          {
            name: 'h1',
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: 700,
            letterSpacing: '-0.01em',
          },
          { name: 'body', fontSize: '15px', lineHeight: '24px', fontWeight: 450 },
        ],
      },
    ],
  },
  spacing: flat('space-4', '16px'),
  radius: flat('radius-md', '10px'),
  zIndex: flat('z-modal', '500'),
  duration: flat('duration-fast', '120ms'),
  easing: flat('ease-standard', 'linear'),
  opacity: flat('opacity-disabled', '0.45'),
  blur: flat('blur-overlay', '6px'),
  size: flat('control-md', '40px'),
  breakpoint: flat('bp-tablet', '768px'),
}

describe('renderTokensCss', () => {
  const css = renderTokensCss(TOKENS)

  it('стиль текста — шорткат font и отдельная разрядка', () => {
    expect(css).toContain('--font-h1: 700 24px/32px var(--font-sans);')
    expect(css).toContain('--tracking-h1: -0.01em;')
    expect(css).toContain('--tracking-body: normal;')
  })

  it('первая тема действует и без атрибута data-theme', () => {
    expect(css).toContain(
      ":root,\n[data-theme='light'] {\n  color-scheme: light;\n  --color-bg: #fff;",
    )
    expect(css).toContain("[data-theme='dark'] {\n  color-scheme: dark;\n  --color-bg: #000;")
  })

  it('тени зависят от темы, остальные группы — общие', () => {
    expect(css).toContain('--shadow-1: b;')
    expect(css).toContain('--space-4: 16px;')
    expect(css).toContain('--z-modal: 500;')
  })

  it('контрольных точек нет: их единственный выход — media.css и media-queries.ts', () => {
    expect(css).not.toContain('768px')
    expect(css).not.toContain('bp-tablet')
  })
})
