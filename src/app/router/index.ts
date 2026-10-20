import { createRouter, createWebHistory, type Router, type RouterHistory } from 'vue-router'

import { routes } from './routes'

/** Фабрика, а не синглтон: тесты создают роутер с memory history. */
export function createAppRouter(history: RouterHistory = createWebHistory()): Router {
  return createRouter({
    history,
    routes,
    scrollBehavior: (_to, _from, savedPosition) => savedPosition ?? { top: 0 },
  })
}
