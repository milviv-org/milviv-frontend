import { createPinia } from 'pinia'
import type { App } from 'vue'

import { createAppRouter } from '../router'

/** Подключает к приложению все глобальные плагины. Единственное место их регистрации. */
export function installProviders(app: App): void {
  app.use(createPinia())
  app.use(createAppRouter())
}
