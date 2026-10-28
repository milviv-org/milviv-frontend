/**
 * Имена маршрутов. Ссылки строятся только по имени (`{ name: RouteName.Home }`), а не по пути:
 * путь можно поменять в одном месте — в `app/router/routes.ts`.
 */
export const RouteName = {
  Home: 'home',
  NotFound: 'not-found',
  /** Витрина UI-kit, только в dev-сборке. */
  DevUi: 'dev-ui',
} as const

export type RouteName = (typeof RouteName)[keyof typeof RouteName]
