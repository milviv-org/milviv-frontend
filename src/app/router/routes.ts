import type { RouteRecordRaw } from 'vue-router'

import { RouteName } from '@/shared/config'

// Витрина UI-kit не попадает в production: условие на import.meta.env.DEV вырезается при сборке.
const devRoutes: RouteRecordRaw[] = import.meta.env.DEV
  ? [
      {
        path: '/dev/ui',
        name: RouteName.DevUi,
        component: () => import('@/pages/dev-ui').then((m) => m.DevUiPage),
      },
    ]
  : []

// Страницы загружаются лениво: каждая — отдельный чанк.
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Home,
    component: () => import('@/pages/home').then((m) => m.HomePage),
  },
  ...devRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: RouteName.NotFound,
    component: () => import('@/pages/not-found').then((m) => m.NotFoundPage),
  },
]
