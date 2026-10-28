import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import { defineConfig, loadEnv, type ProxyOptions } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'DEV_')

  return {
    plugins: [
      vue(),
      // Иконки — компоненты `~icons/lucide/<name>`; в бандл попадают только импортированные.
      // Размер и обводку задаёт глобальный класс `.mv-icon` (shared/styles/base.css).
      Icons({ compiler: 'vue3', defaultClass: 'mv-icon' }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': createApiProxy(env),
      },
    },
    // Lightning CSS (уже в составе Vite) подставляет именованные медиазапросы `@media (--mv-*)`
    // из src/shared/styles/media.css — контрольные точки живут в одном месте (ADR 0012).
    css: {
      transformer: 'lightningcss',
      lightningcss: { drafts: { customMedia: true } },
    },
    build: {
      target: 'es2022',
    },
  }
})

/**
 * Фронтенд и API живут на одном origin: cookie сессии — `SameSite=Strict`.
 * Пока у бэкенда нет префикса `/api` (docs/BACKEND-REQUESTS.md, п. 1), прокси срезает его
 * и переписывает путь refresh-cookie. После доработки бэкенда: `DEV_API_STRIP_PREFIX=false`.
 */
function createApiProxy(env: Record<string, string>): ProxyOptions {
  const proxy: ProxyOptions = {
    target: env.DEV_API_TARGET ?? 'http://localhost:8080',
    changeOrigin: true,
  }

  if (env.DEV_API_STRIP_PREFIX !== 'false') {
    proxy.rewrite = (path) => path.replace(/^\/api/, '')
    proxy.cookiePathRewrite = { '/auth': '/api/auth' }
  }

  return proxy
}
