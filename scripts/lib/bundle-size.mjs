// @ts-check

/**
 * @typedef {{ js: string[]; css: string[] }} InitialAssets
 * @typedef {{ kind: 'js' | 'css'; bytes: number; limitBytes: number; exceeded: boolean }} BudgetResult
 */

/**
 * Находит файлы, которые браузер грузит до первого экрана: точку входа, её modulepreload и стили.
 *
 * Зачем разбирать `index.html`, а не маску `assets/index-*.js`: Vite называет ленивые чанки
 * по имени модуля, и страница из `pages/x/index.ts` тоже может стать `index-*.js`. В `index.html`
 * попадает ровно то, что нужно для старта, — это и есть бюджет LCP.
 *
 * @param {string} html содержимое `dist/index.html`
 * @returns {InitialAssets} пути из атрибутов как есть (`/assets/…`); внешние URL пропускаются
 */
export function findInitialAssets(html) {
  /** @type {InitialAssets} */
  const assets = { js: [], css: [] }

  for (const [tag] of html.matchAll(/<(?:script|link)\b[^>]*>/g)) {
    const attrs = parseAttributes(tag)
    const isLocal = (/** @type {string | undefined} */ url) =>
      Boolean(url) && !/^https?:/.test(String(url))

    if (tag.startsWith('<script') && attrs.type === 'module' && isLocal(attrs.src)) {
      assets.js.push(String(attrs.src))
    } else if (attrs.rel === 'modulepreload' && isLocal(attrs.href)) {
      assets.js.push(String(attrs.href))
    } else if (attrs.rel === 'stylesheet' && isLocal(attrs.href)) {
      assets.css.push(String(attrs.href))
    }
  }

  return assets
}

/**
 * Сравнивает размеры с бюджетом.
 *
 * Почему результат — данные, а не вывод в консоль: решение «предупредить или упасть» и формат
 * сообщения принимает вызывающий скрипт; здесь только арифметика, которую легко проверить тестом.
 *
 * @param {{ js: number; css: number }} sizes байты после gzip
 * @param {{ js: number; css: number }} limits байты после gzip
 * @returns {BudgetResult[]}
 */
export function evaluateBudgets(sizes, limits) {
  return /** @type {const} */ (['js', 'css']).map((kind) => ({
    kind,
    bytes: sizes[kind],
    limitBytes: limits[kind],
    exceeded: sizes[kind] > limits[kind],
  }))
}

/**
 * Размер для человека: «39.1 КБ». Килобайт — 1000 байт, как в выводе Vite, чтобы цифры совпадали.
 * @param {number} bytes
 */
export function formatKb(bytes) {
  return `${(bytes / 1000).toFixed(1)} КБ`
}

/** @param {string} tag */
function parseAttributes(tag) {
  /** @type {Record<string, string>} */
  const attrs = {}
  for (const [, name, value] of tag.matchAll(/([\w-]+)="([^"]*)"/g)) {
    if (name) attrs[name] = value ?? ''
  }
  return attrs
}
