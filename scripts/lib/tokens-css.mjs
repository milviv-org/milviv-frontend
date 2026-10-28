// @ts-check

/**
 * Группы токенов вида «имя → значение», одинаковые в обеих темах.
 * Имя токена уже содержит свой префикс (`space-4`, `radius-md`), поэтому группа в имя не добавляется.
 */
const FLAT_GROUPS = ['spacing', 'radius', 'zIndex', 'duration', 'easing', 'opacity', 'blur', 'size']

/** @param {string} name @param {string} value */
const declaration = (name, value) => `  --${name}: ${value};`

/**
 * Превращает `tokens.json` дизайн-системы в CSS-переменные.
 *
 * Зачем генератор, а не ручной перенос: токены должны совпадать с дизайн-системой годами,
 * а ручная копия расходится незаметно. CI сравнивает результат с `tokens.css` (ADR 0008).
 *
 * Почему такой вывод:
 * - стиль текста — шорткат `--font-<стиль>` для свойства `font` и отдельная `--tracking-<стиль>`:
 *   `letter-spacing` в шорткат `font` не входит;
 * - первая тема из `color.themes` — тема по умолчанию: работает и без атрибута `data-theme`;
 * - контрольных точек здесь нет: CSS-переменные не работают в `@media`. Точки превращаются
 *   в именованные медиазапросы — `media.css` и `media-queries.ts` (ADR 0012).
 *
 * @param {any} tokens содержимое `design/tokens.json`
 * @returns {string} готовый `tokens.css`
 */
export function renderTokensCss(tokens) {
  const themes = tokens.color.themes.map((/** @type {any} */ theme, /** @type {number} */ index) =>
    renderTheme(tokens, theme.id, index === 0),
  )

  return `/*
 * Сгенерировано scripts/build-tokens.mjs из design/tokens.json — не править вручную.
 * Контрольные точки — в media.css (CSS) и shared/config/media-queries.ts (JS), ADR 0012.
 */

${renderRoot(tokens)}

${themes.join('\n\n')}
`
}

/** @param {any} tokens */
function renderRoot(tokens) {
  const lines = []

  for (const [family, stack] of Object.entries(tokens.type.families)) {
    lines.push(declaration(`font-${family}`, String(stack)))
  }

  for (const group of tokens.type.groups) {
    for (const style of group.styles) {
      const font = `${style.fontWeight} ${style.fontSize}/${style.lineHeight} var(--font-${group.family})`
      lines.push(declaration(`font-${style.name}`, font))
      lines.push(declaration(`tracking-${style.name}`, style.letterSpacing ?? 'normal'))
    }
  }

  for (const group of FLAT_GROUPS) {
    for (const token of tokens[group].tokens) lines.push(declaration(token.name, token.value))
  }

  return `:root {\n${lines.join('\n')}\n}`
}

/** @param {any} tokens @param {string} themeId @param {boolean} isDefault */
function renderTheme(tokens, themeId, isDefault) {
  const lines = [`  color-scheme: ${themeId};`]
  for (const token of tokens.color.tokens) lines.push(declaration(token.name, token.value[themeId]))
  for (const token of tokens.shadow.tokens)
    lines.push(declaration(token.name, token.value[themeId]))

  const selector = isDefault ? `:root,\n[data-theme='${themeId}']` : `[data-theme='${themeId}']`
  return `${selector} {\n${lines.join('\n')}\n}`
}
