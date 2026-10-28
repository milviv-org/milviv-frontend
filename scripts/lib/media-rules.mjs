// @ts-check

/** Файл с определениями `@custom-media` — единственное место, где числа в медиазапросах разрешены. */
export const MEDIA_FILE = 'src/shared/styles/media.css'

/**
 * Медиазапросы по ширине или высоте с числом: `@media (min-width: 1024px)`, `(width < 768px)`.
 *
 * Зачем запрет: контрольные точки задаёт tokens.json, а в CSS они попадают только через
 * `@custom-media --mv-*` (ADR 0012). Число, написанное руками, — копия, которая молча разойдётся
 * с дизайн-системой. Запросы без размеров (`prefers-reduced-motion`, `hover: none`) не трогаем.
 *
 * @param {string} css
 * @returns {string[]} прелюдии нарушающих `@media`
 */
export function findRawSizeQueries(css) {
  const source = stripComments(css)
  const preludes = [...source.matchAll(/@media([^{]*)\{/g)].map(([, prelude = '']) =>
    prelude.trim(),
  )
  return preludes.filter((prelude) => /(width|height)[^)]*\d/.test(prelude))
}

/**
 * Стиль использует `@media (--mv-*)`, но не подключает `media.css`.
 *
 * Почему это ошибка, а не мелочь: Lightning CSS не знает такого имени и молча оставляет запрос
 * как есть — браузер его не поймёт, и правило никогда не сработает. Определения видны только
 * внутри того же блока стилей, поэтому `@import` нужен в каждом блоке, где есть `--mv-*`.
 *
 * @param {string} css
 */
export function isMissingMediaImport(css) {
  const source = stripComments(css)
  const usesCustomMedia = /@media[^{]*\(--mv-/.test(source)
  const importsMedia = /@import\s+['"][^'"]*shared\/styles\/media\.css['"]/.test(source)
  return usesCustomMedia && !importsMedia
}

/** @param {string} css */
function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '')
}
