import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppButton from './AppButton.vue'

describe('AppButton', () => {
  it('сообщает о нажатии', async () => {
    const wrapper = mount(AppButton, { slots: { default: 'Сохранить' } })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('в загрузке остаётся в фокусе, но не срабатывает повторно', async () => {
    const wrapper = mount(AppButton, { props: { loading: true }, slots: { default: 'Сохранить' } })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.attributes('disabled')).toBeUndefined()
  })
})
