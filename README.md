# MILVIV Frontend

Веб-клиент MILVIV — системы управления целями, проектами и задачами с геймификацией.
Vue 3 · TypeScript · Vite · Pinia · Vue Router.

## Запуск

Нужны Node 22.12+ (`.nvmrc`) и запущенный бэкенд (`skyrim_grade_java`, порт 8080).

```bash
corepack pnpm install      # зависимости и git hooks
cp .env.example .env.local # при необходимости поменять адрес бэкенда
corepack pnpm dev          # http://localhost:5173
```

Чтобы писать просто `pnpm`, один раз выполните `corepack enable` (может потребовать прав администратора).

Dev-сервер проксирует `/api/*` на бэкенд. Бэкенду в разработке нужен `AUTH_COOKIE_SECURE=false`, если cookie не сохраняются по http.

## Команды

| Команда                         | Что делает                                                         |
| ------------------------------- | ------------------------------------------------------------------ |
| `pnpm dev`                      | Dev-сервер                                                         |
| `pnpm build`                    | Production-сборка в `dist/`                                        |
| `pnpm check`                    | Всё, что проверяет CI: токены, классы, формат, линт, типы, тесты   |
| `pnpm lint:fix` / `pnpm format` | Исправить линт / форматирование                                    |
| `pnpm test`                     | Тесты в режиме наблюдения                                          |
| `pnpm tokens`                   | Пересобрать из `design/tokens.json`: токены, медиазапросы CSS и JS |
| `pnpm size`                     | Бюджет бандла после `pnpm build`: предупреждает                    |
| `pnpm css:check`                | Правила стилей: префикс `mv-`, медиазапросы только `--mv-*`        |

Витрина UI-kit — http://localhost:5173/dev/ui (только в dev-сборке).

## Документация

- [Архитектура](docs/ARCHITECTURE.md) — как устроено приложение и почему. Начинать с неё.
- [Этапы разработки](docs/ROADMAP.md)
- [Соглашения о коде](docs/CONVENTIONS.md) — обязательны
- [Библиотеки](docs/LIBRARIES.md) — зачем каждая зависимость
- [Решения (ADR)](docs/adr/README.md)
- [Дизайн](docs/DESIGN.md) и [бриф экранов](docs/DESIGN-BRIEF.md)
- [Доработки бэкенда](docs/BACKEND-REQUESTS.md)

## Правила, которые проверяет машина

- Слои FSD и публичный API слайсов — ESLint (`boundaries/dependencies`).
- Даты только через `@/shared/lib/date`, подписки только через VueUse — ESLint (`no-restricted-syntax`).
- Префикс `mv-` у CSS-классов и медиазапросы только `@media (--mv-*)` — `pnpm css:check`.
- Reka UI только в `src/shared/ui` — ESLint (`no-restricted-imports`).
- Сообщения коммитов — Conventional Commits (`feat(tasks): …`), git hook `commit-msg`.
