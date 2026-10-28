import { usePreferredDark, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, watch } from 'vue'

import {
  DEFAULT_THEME_PREFERENCE,
  THEME_STORAGE_KEY,
  parseThemePreference,
  resolveTheme,
  type Theme,
  type ThemePreference,
} from './theme'

/**
 * Тема оформления приложения: выбор пользователя, сохранённый между визитами, и применённая тема.
 *
 * Почему store, а не локальное состояние переключателя: тема должна меняться вслед за системой,
 * даже когда экран настроек закрыт. Store создаётся один раз в `app/providers` и живёт с приложением.
 * Первую отрисовку без вспышки делает inline-скрипт в index.html; store подхватывает тему дальше.
 */
export const useThemeStore = defineStore('theme', () => {
  const preference = useStorage<ThemePreference>(
    THEME_STORAGE_KEY,
    DEFAULT_THEME_PREFERENCE,
    undefined,
    { serializer: { read: parseThemePreference, write: (value) => value } },
  )
  const prefersDark = usePreferredDark()
  const theme = computed<Theme>(() => resolveTheme(preference.value, prefersDark.value))

  watch(theme, applyTheme, { immediate: true })

  function setPreference(value: ThemePreference): void {
    preference.value = value
  }

  return { preference, theme, setPreference }
})

/**
 * Применяет тему к документу. Цвет строки состояния браузера и PWA (`theme-color`) берётся
 * из токена `--color-bg` уже применённой темы — а не дублируется числом в коде.
 */
function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.dataset.theme = theme
  const background = getComputedStyle(root).getPropertyValue('--color-bg').trim()
  if (background) {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', background)
  }
}
