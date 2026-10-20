import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory } from 'vue-router'

import { RouteName } from '@/shared/config'

import App from '../App.vue'

import { createAppRouter } from '.'

async function renderAt(path: string) {
  const router = createAppRouter(createMemoryHistory())
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router] } })
  await flushPromises()
  return { router, wrapper }
}

describe('app router', () => {
  it('открывает главную по корневому пути', async () => {
    const { router, wrapper } = await renderAt('/')

    expect(router.currentRoute.value.name).toBe(RouteName.Home)
    expect(wrapper.text()).toContain('MILVIV')
  })

  it('показывает «не найдено» для неизвестного пути', async () => {
    const { router, wrapper } = await renderAt('/no/such/page')

    expect(router.currentRoute.value.name).toBe(RouteName.NotFound)
    expect(wrapper.text()).toContain('Страница не найдена')
  })
})
