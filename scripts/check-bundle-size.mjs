// @ts-check
// Бюджет начального бандла (ARCHITECTURE, 7; ADR 0011). Запускать после `pnpm build`.
// Превышение — предупреждение, а не ошибка: рост бандла может быть оправдан, решает человек.
import { readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

import { evaluateBudgets, findInitialAssets, formatKb } from './lib/bundle-size.mjs'

/** Бюджеты в байтах после gzip. JS — из ARCHITECTURE (≤ 150 КБ); CSS — запас ×4 от текущего. */
const LIMITS = { js: 150_000, css: 20_000 }

const DIST = new URL('../dist/', import.meta.url)

let html
try {
  html = readFileSync(new URL('index.html', DIST), 'utf8')
} catch {
  console.error('Нет dist/index.html: сначала `pnpm build`.')
  process.exit(1)
}

/** @param {string[]} paths */
const gzippedBytes = (paths) =>
  paths.reduce((sum, path) => sum + gzipSync(readFileSync(new URL(`.${path}`, DIST))).length, 0)

const assets = findInitialAssets(html)
const results = evaluateBudgets(
  { js: gzippedBytes(assets.js), css: gzippedBytes(assets.css) },
  LIMITS,
)
// В GitHub Actions предупреждение становится аннотацией в интерфейсе PR.
const inCi = process.env.GITHUB_ACTIONS === 'true'

for (const { kind, bytes, limitBytes, exceeded } of results) {
  const line = `Начальный ${kind.toUpperCase()}: ${formatKb(bytes)} из ${formatKb(limitBytes)} (gzip)`
  if (!exceeded) console.log(`✓ ${line}`)
  else if (inCi) console.log(`::warning title=Бюджет бандла превышен::${line}`)
  else console.warn(`⚠ ${line} — бюджет превышен`)
}
