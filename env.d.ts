/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Базовый путь REST API. По умолчанию `/api` — тот же origin, что и у фронтенда. */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
