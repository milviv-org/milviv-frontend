import { createPinia } from 'pinia'
import type { App } from 'vue'

import { useThemeStore } from '@/features/theme-switch'

import { createAppRouter } from '../router'

/** Подключает к приложению все глобальные плагины. Единственное место их регистрации. */
export function installProviders(app: App): void {
  const pinia = createPinia()
  app.use(pinia)
  app.use(createAppRouter())

  // Тема живёт с приложения целиком: следит за системной темой, даже если переключатель не открыт.
  useThemeStore(pinia)
}
