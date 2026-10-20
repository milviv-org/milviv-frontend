import type { RouteRecordRaw } from 'vue-router'

import { RouteName } from '@/shared/config'

// Страницы загружаются лениво: каждая — отдельный чанк.
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Home,
    component: () => import('@/pages/home').then((m) => m.HomePage),
  },
  {
    path: '/:pathMatch(.*)*',
    name: RouteName.NotFound,
    component: () => import('@/pages/not-found').then((m) => m.NotFoundPage),
  },
]
