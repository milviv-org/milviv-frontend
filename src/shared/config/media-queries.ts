// Сгенерировано scripts/build-tokens.mjs из design/tokens.json — не править вручную.

/** Контрольные точки дизайн-системы, px. Для расчётов; для условий — {@link MediaQuery}. */
export const Breakpoint = {
  Mobile: 375,
  Tablet: 768,
  Desktop: 1024,
  Wide: 1440,
} as const

/**
 * Именованные медиазапросы — те же, что `@custom-media --mv-*` в CSS (ADR 0012).
 * `Xxx` — ровно диапазон точки, `XxxUp` — от точки и шире.
 *
 * @example useMediaQuery(MediaQuery.DesktopUp)
 */
export const MediaQuery = {
  Mobile: '(width < 768px)',
  Tablet: '(768px <= width < 1024px)',
  TabletUp: '(width >= 768px)',
  Desktop: '(1024px <= width < 1440px)',
  DesktopUp: '(width >= 1024px)',
  Wide: '(width >= 1440px)',
} as const
