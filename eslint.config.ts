import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import boundaries from 'eslint-plugin-boundaries'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'

/**
 * Слои Feature-Sliced Design (docs/ARCHITECTURE.md, раздел 2), сверху вниз.
 * Слой импортирует только слои ниже себя; слайс — только через публичный API (index.ts).
 */
const LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'] as const

/** Публичный API: index.ts слайса; у сегментов shared — ещё index.ts подмодуля (`shared/lib/date`). */
const PUBLIC_API = '{index.ts,*/index.ts}'

const layerPolicies = LAYERS.map((layer, index) => {
  const below = LAYERS.slice(index + 1)
  // shared — набор независимых сегментов, им можно опираться друг на друга.
  const targets = layer === 'shared' ? ['shared'] : below

  return {
    from: { element: { type: layer } },
    allow: { to: { element: { types: targets, fileInternalPath: PUBLIC_API } } },
  }
})

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,vue}'],
  },

  globalIgnores(['**/dist/**', '**/coverage/**', '**/node_modules/**']),

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.strict,

  {
    name: 'app/code-style',
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      'vue/block-lang': ['error', { script: { lang: 'ts' } }],
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        { registeredComponentsOnly: false },
      ],
      'vue/define-macros-order': [
        'error',
        { order: ['defineOptions', 'defineProps', 'defineEmits', 'defineModel', 'defineSlots'] },
      ],
      'vue/no-undef-components': 'error',
      'vue/no-unused-refs': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/require-typed-ref': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
    },
  },

  {
    name: 'app/architecture',
    files: ['src/**/*.{ts,vue}'],
    plugins: { boundaries },
    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.app.json' },
      },
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app' },
        ...LAYERS.slice(1).map((layer) => ({
          type: layer,
          pattern: `src/${layer}/*`,
          capture: ['slice'],
        })),
      ],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          message:
            'Нарушена граница слоёв FSD: слой импортирует только нижележащие слои и только через публичный API слайса (index.ts). См. docs/ARCHITECTURE.md, раздел 2.',
          policies: [
            ...layerPolicies,
            // Сущность может сослаться на ТИП другой сущности — только `import type` и через её index.ts.
            {
              from: { element: { type: 'entities' } },
              allow: {
                to: { element: { type: 'entities', fileInternalPath: PUBLIC_API } },
                dependency: { kind: 'type' },
              },
            },
            // Внутри своего слайса — любые относительные импорты.
            { allow: { dependency: { relationship: { to: 'internal' } } } },
          ],
        },
      ],
      'boundaries/no-unknown-files': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: "NewExpression[callee.name='Date']",
          message:
            'Даты — только через @/shared/lib/date (сервер считает даты по UTC). См. docs/ARCHITECTURE.md, 3.3.',
        },
        {
          selector: "CallExpression[callee.property.name='addEventListener']",
          message:
            'Подписки — через VueUse (useEventListener): она снимает их сама. Ручной addEventListener ведёт к утечкам.',
        },
      ],
    },
  },

  {
    name: 'app/ui-library',
    files: ['src/**/*.{ts,vue}'],
    ignores: ['src/shared/ui/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'reka-ui',
              message:
                'Reka UI используется только внутри src/shared/ui — берите обёртки App* из @/shared/ui (ADR 0010).',
            },
          ],
        },
      ],
    },
  },

  {
    name: 'app/scripts',
    // Скрипты сборки и проверок общаются с человеком через консоль — это их результат.
    files: ['scripts/**/*.mjs'],
    rules: { 'no-console': 'off' },
  },

  {
    name: 'app/exceptions',
    // Низкоуровневые обёртки, ради которых правила выше и существуют.
    files: ['src/shared/lib/date/**', 'src/**/*.test.ts'],
    rules: { 'no-restricted-syntax': 'off' },
  },

  skipFormatting,
)
