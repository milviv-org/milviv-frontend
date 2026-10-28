// @ts-check
// Собирает из design/tokens.json всё, что от него зависит (ADR 0008, 0012):
//   src/shared/styles/tokens.css           — CSS-переменные
//   src/shared/styles/media.css            — именованные медиазапросы @custom-media
//   src/shared/config/media-queries.ts     — те же запросы и контрольные точки для JS
// `--check` не пишет файлы, а падает, если хоть один устарел — так CI ловит забытый `pnpm tokens`.
import { readFileSync, writeFileSync } from 'node:fs'

import {
  buildMediaQueries,
  readBreakpoints,
  renderCustomMediaCss,
  renderMediaQueriesTs,
} from './lib/media-queries.mjs'
import { renderTokensCss } from './lib/tokens-css.mjs'

const root = (/** @type {string} */ path) => new URL(`../${path}`, import.meta.url)

const tokens = JSON.parse(readFileSync(root('design/tokens.json'), 'utf8'))
const breakpoints = readBreakpoints(tokens)
const queries = buildMediaQueries(breakpoints)

/** @type {Record<string, string>} путь → содержимое */
const outputs = {
  'src/shared/styles/tokens.css': renderTokensCss(tokens),
  'src/shared/styles/media.css': renderCustomMediaCss(queries),
  'src/shared/config/media-queries.ts': renderMediaQueriesTs(breakpoints, queries),
}

/** @param {string} path */
function readOrEmpty(path) {
  try {
    return readFileSync(root(path), 'utf8')
  } catch {
    return ''
  }
}

if (process.argv.includes('--check')) {
  const stale = Object.keys(outputs).filter((path) => readOrEmpty(path) !== outputs[path])
  if (stale.length > 0) {
    console.error(`Устарели: ${stale.join(', ')}. Запустите \`pnpm tokens\`.`)
    process.exit(1)
  }
} else {
  for (const [path, content] of Object.entries(outputs)) writeFileSync(root(path), content)
}
