/** Выбор пользователя. `system` — следовать настройке операционной системы. */
export type ThemePreference = 'light' | 'dark' | 'system'

/** Тема, которая реально применяется к документу (`data-theme` на `<html>`). */
export type Theme = 'light' | 'dark'

/** Ключ в localStorage. Тот же ключ читает inline-скрипт в index.html до загрузки бандла. */
export const THEME_STORAGE_KEY = 'milviv:theme'

/** Тема по умолчанию: системная. Пользователь, который ничего не выбирал, видит то же, что в ОС. */
export const DEFAULT_THEME_PREFERENCE: ThemePreference = 'system'

const PREFERENCES: readonly ThemePreference[] = ['light', 'dark', 'system']

/**
 * Читает выбор темы из хранилища.
 *
 * Зачем проверка: в localStorage может оказаться что угодно — ручная правка, значение старой версии,
 * `null` в приватном режиме. Неизвестное значение не должно ломать тему — откатываемся к системной.
 */
export function parseThemePreference(raw: unknown): ThemePreference {
  return PREFERENCES.includes(raw as ThemePreference)
    ? (raw as ThemePreference)
    : DEFAULT_THEME_PREFERENCE
}

/** Какую тему применить: явный выбор пользователя побеждает настройку системы. */
export function resolveTheme(preference: ThemePreference, prefersDark: boolean): Theme {
  if (preference !== 'system') return preference
  return prefersDark ? 'dark' : 'light'
}
