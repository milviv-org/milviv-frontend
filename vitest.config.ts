import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config.ts'

export default defineConfig((env) =>
  mergeConfig(viteConfig(env), {
    test: {
      environment: 'happy-dom',
      include: ['src/**/*.test.ts'],
      exclude: [...configDefaults.exclude],
      restoreMocks: true,
      unstubGlobals: true,
    },
  }),
)
