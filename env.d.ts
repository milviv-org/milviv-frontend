/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/vue3" />

interface ImportMetaEnv {
  /** Базовый путь REST API. По умолчанию `/api` — тот же origin, что и у фронтенда. */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
