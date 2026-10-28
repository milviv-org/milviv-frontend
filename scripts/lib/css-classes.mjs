// @ts-check

/** Префикс всех классов проекта (CONVENTIONS, 6.2). */
export const CLASS_PREFIX = 'mv-'

/**
 * Имена классов из селекторов CSS.
 *
 * Зачем свой разбор, а не stylelint: правило одно — префикс, и регулярных выражений хватает (ADR 0011).
 * Почему смотрим только прелюдии правил (текст перед `{`): в значениях свойств тоже бывают точки —
 * `url(./fonts/x.woff2)`, `scale(0.97)` — и они не классы. Из прелюдии берётся часть после последней
 * `;`: так вложенное правило не захватывает объявления родителя. At-правила (`@media`) пропускаются,
 * их вложенные правила разбираются как обычные.
 *
 * @param {string} css
 * @returns {string[]} имена без точки, по порядку появления, с повторами
 */
export function findCssClasses(css) {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const classes = []

  for (const [, prelude = ''] of source.matchAll(/([^{}]*)\{/g)) {
    const selector = prelude.slice(prelude.lastIndexOf(';') + 1).trim()
    if (selector.startsWith('@')) continue
    // Значения атрибутов (`[href$='.pdf']`) и строки могут содержать точки.
    const withoutValues = selector.replace(/\[[^\]]*\]/g, '').replace(/(['"])[^'"]*\1/g, '')
    for (const [, name] of withoutValues.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) {
      if (name) classes.push(name)
    }
  }

  return classes
}

/**
 * Статические классы из шаблона Vue: атрибуты `class="…"`.
 * Динамический `:class` не разбирается — его классы почти всегда есть и в стилях, где их ловит
 * {@link findCssClasses}.
 *
 * @param {string} template
 */
export function findTemplateClasses(template) {
  const classes = []
  for (const [, value = ''] of template.matchAll(/\sclass="([^"]*)"/g)) {
    classes.push(...value.split(/\s+/).filter(Boolean))
  }
  return classes
}

/**
 * Разделяет однофайловый компонент на шаблон и стили.
 * Блок `<style src="…">` пропускается: внешний файл проверяется отдельно.
 *
 * @param {string} source
 * @returns {{ template: string; styles: string[] }}
 */
export function splitVueFile(source) {
  const styles = []
  for (const [, attrs = '', body = ''] of source.matchAll(/<style\b([^>]*)>([\s\S]*?)<\/style>/g)) {
    if (!/\ssrc=/.test(attrs)) styles.push(body)
  }
  const template = /<template>([\s\S]*)<\/template>/.exec(source)?.[1] ?? ''
  return { template, styles }
}

/**
 * Классы без префикса `mv-`, без повторов.
 * @param {string[]} classes
 */
export function findForeignClasses(classes) {
  return [...new Set(classes.filter((name) => !name.startsWith(CLASS_PREFIX)))]
}
