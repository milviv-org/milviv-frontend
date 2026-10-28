// @ts-check

/**
 * @typedef {{ name: string; px: number }} BreakpointToken
 * @typedef {{ name: string; query: string }} NamedMediaQuery
 */

/**
 * Строит именованные медиазапросы из контрольных точек дизайн-системы (`bp-*` в tokens.json).
 *
 * Зачем: точки должны жить в одном месте. И CSS (`@custom-media`), и JS (`matchMedia`) получают
 * запросы из этой функции, поэтому строки совпадают байт в байт (ADR 0012).
 *
 * Почему такие запросы:
 * - `<имя>` — ровно диапазон точки: от неё до следующей (`768px <= width < 1024px`);
 * - `<имя>-up` — от точки и шире: основа mobile-first;
 * - у первой точки (мобильная, база макетов) нет нижней границы, поэтому нет и `-up`;
 * - у последней нет верхней — её диапазон и есть «от точки и шире», `-up` был бы дублем;
 * - синтаксис диапазонов (`width < 768px`) вместо `max-width: 767px` — без производных чисел
 *   и без дыры между 767 и 768 при дробном масштабе.
 *
 * @param {BreakpointToken[]} breakpoints в любом порядке
 * @returns {NamedMediaQuery[]}
 */
export function buildMediaQueries(breakpoints) {
  const sorted = [...breakpoints].sort((a, b) => a.px - b.px)
  /** @type {NamedMediaQuery[]} */
  const queries = []

  sorted.forEach((point, index) => {
    const next = sorted[index + 1]
    if (index === 0) {
      if (next) queries.push({ name: point.name, query: `(width < ${next.px}px)` })
      return
    }
    const up = `(width >= ${point.px}px)`
    if (!next) {
      // У последней точки диапазон открыт сверху — он и есть «от точки и шире», дубль не нужен.
      queries.push({ name: point.name, query: up })
      return
    }
    queries.push({ name: point.name, query: `(${point.px}px <= width < ${next.px}px)` })
    queries.push({ name: `${point.name}-up`, query: up })
  })

  return queries
}

/**
 * Достаёт контрольные точки из tokens.json: `bp-tablet: "768px"` → `{ name: 'tablet', px: 768 }`.
 * @param {any} tokens содержимое `design/tokens.json`
 * @returns {BreakpointToken[]}
 */
export function readBreakpoints(tokens) {
  return tokens.breakpoint.tokens.map((/** @type {{ name: string; value: string }} */ token) => {
    const px = Number.parseFloat(token.value)
    if (!token.value.endsWith('px') || Number.isNaN(px)) {
      throw new Error(`Контрольная точка ${token.name} должна быть в px, получено «${token.value}»`)
    }
    return { name: token.name.replace(/^bp-/, ''), px }
  })
}

/**
 * `media.css`: определения `@custom-media --mv-<имя>`. Компоненты подключают файл через `@import`
 * и пишут `@media (--mv-desktop-up)`; Lightning CSS заменяет имя на запрос при сборке.
 * @param {NamedMediaQuery[]} queries
 */
export function renderCustomMediaCss(queries) {
  const lines = queries.map(({ name, query }) => `@custom-media --mv-${name} ${query};`)
  return `/*
 * Сгенерировано scripts/build-tokens.mjs из design/tokens.json — не править вручную.
 * Именованные медиазапросы (ADR 0012). Подключение в компоненте:
 *   @import '@/shared/styles/media.css';
 *   @media (--mv-desktop-up) { … }
 * На выходе файл даёт 0 байт: определения заменяются запросами при сборке.
 */

${lines.join('\n')}
`
}

/**
 * `media-queries.ts`: те же запросы и сами точки для JS (`useMediaQuery`, расчёты раскладки).
 * @param {BreakpointToken[]} breakpoints
 * @param {NamedMediaQuery[]} queries
 */
export function renderMediaQueriesTs(breakpoints, queries) {
  const sorted = [...breakpoints].sort((a, b) => a.px - b.px)
  const points = sorted.map(({ name, px }) => `  ${pascalCase(name)}: ${px},`)
  const media = queries.map(({ name, query }) => `  ${pascalCase(name)}: '${query}',`)

  return `// Сгенерировано scripts/build-tokens.mjs из design/tokens.json — не править вручную.

/** Контрольные точки дизайн-системы, px. Для расчётов; для условий — {@link MediaQuery}. */
export const Breakpoint = {
${points.join('\n')}
} as const

/**
 * Именованные медиазапросы — те же, что \`@custom-media --mv-*\` в CSS (ADR 0012).
 * \`Xxx\` — ровно диапазон точки, \`XxxUp\` — от точки и шире.
 *
 * @example useMediaQuery(MediaQuery.DesktopUp)
 */
export const MediaQuery = {
${media.join('\n')}
} as const
`
}

/** @param {string} kebab */
function pascalCase(kebab) {
  return kebab.replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase())
}
