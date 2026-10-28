import { describe, expect, it } from 'vitest'

import { evaluateBudgets, findInitialAssets, formatKb } from './bundle-size.mjs'

const HTML = `<!doctype html>
<html>
  <head>
    <script>/* inline: не файл */</script>
    <script type="module" crossorigin src="/assets/index-abc.js"></script>
    <link rel="modulepreload" crossorigin href="/assets/vendor-def.js">
    <link rel="stylesheet" crossorigin href="/assets/index-ghi.css">
    <link rel="stylesheet" href="https://fonts.example.com/x.css">
    <link rel="icon" href="/favicon.svg">
  </head>
</html>`

describe('findInitialAssets', () => {
  it('берёт точку входа, modulepreload и локальные стили', () => {
    expect(findInitialAssets(HTML)).toEqual({
      js: ['/assets/index-abc.js', '/assets/vendor-def.js'],
      css: ['/assets/index-ghi.css'],
    })
  })

  it('пустой html — пустой список', () => {
    expect(findInitialAssets('')).toEqual({ js: [], css: [] })
  })
})

describe('evaluateBudgets', () => {
  it('отмечает только превышенный бюджет; ровно на пределе — не превышение', () => {
    const results = evaluateBudgets({ js: 151, css: 20 }, { js: 150, css: 20 })

    expect(results).toEqual([
      { kind: 'js', bytes: 151, limitBytes: 150, exceeded: true },
      { kind: 'css', bytes: 20, limitBytes: 20, exceeded: false },
    ])
  })
})

describe('formatKb', () => {
  it('считает килобайт как 1000 байт, как Vite', () => {
    expect(formatKb(39_080)).toBe('39.1 КБ')
  })
})
