// @ts-check
// Правила стилей, которые не умеет проверять ESLint (CONVENTIONS, 6; ADR 0011, 0012):
//   1. каждый CSS-класс начинается с `mv-`;
//   2. в медиазапросах по размеру нет чисел — только `@custom-media --mv-*`;
//   3. блок стилей с `--mv-*` подключает media.css.
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  findCssClasses,
  findForeignClasses,
  findTemplateClasses,
  splitVueFile,
} from './lib/css-classes.mjs'
import { MEDIA_FILE, findRawSizeQueries, isMissingMediaImport } from './lib/media-rules.mjs'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SOURCE_DIR = join(ROOT, 'src')

/**
 * Блоки стилей файла: у `.css` — весь файл, у `.vue` — каждый `<style>` отдельно,
 * потому что определения `@custom-media` видны только внутри своего блока.
 * @param {string} path
 */
function readFile(path) {
  const source = readFileSync(path, 'utf8')
  if (path.endsWith('.css')) return { templateClasses: [], styles: [source] }
  const { template, styles } = splitVueFile(source)
  return { templateClasses: findTemplateClasses(template), styles }
}

/** @param {string} path @returns {string[]} */
function checkFile(path) {
  const { templateClasses, styles } = readFile(path)
  const problems = []

  const foreign = findForeignClasses([...templateClasses, ...styles.flatMap(findCssClasses)])
  if (foreign.length > 0) {
    problems.push(`классы без префикса mv-: ${foreign.map((name) => `.${name}`).join(', ')}`)
  }

  const isMediaFile = relative(ROOT, path).split(sep).join('/') === MEDIA_FILE
  for (const css of styles) {
    if (!isMediaFile) {
      for (const query of findRawSizeQueries(css)) {
        problems.push(`число в медиазапросе «${query}» — используйте @media (--mv-*)`)
      }
    }
    if (isMissingMediaImport(css)) {
      problems.push(`@media (--mv-*) без @import '@/shared/styles/media.css' — запрос не сработает`)
    }
  }

  return problems
}

const files = readdirSync(SOURCE_DIR, { recursive: true, encoding: 'utf8' })
  .filter((file) => /\.(vue|css)$/.test(file))
  .map((file) => join(SOURCE_DIR, file))

let total = 0
for (const file of files) {
  const problems = checkFile(file)
  total += problems.length
  for (const problem of problems) console.error(`${relative(ROOT, file)}: ${problem}`)
}

if (total > 0) {
  console.error(`\nНарушений правил стилей: ${total}. См. docs/CONVENTIONS.md, раздел 6.`)
  process.exit(1)
}
console.log(`✓ Правила стилей соблюдены (${files.length} файлов)`)
