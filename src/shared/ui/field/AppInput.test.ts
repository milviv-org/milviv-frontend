import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppInput from './AppInput.vue'

describe('AppInput', () => {
  it('связывает подпись и подсказку с полем', () => {
    const wrapper = mount(AppInput, { props: { label: 'Название', hint: 'До 200 символов' } })
    const input = wrapper.get('input')
    const describedBy = input.attributes('aria-describedby')

    expect(wrapper.get('label').attributes('for')).toBe(input.attributes('id'))
    expect(describedBy).toBeTruthy()
    expect(wrapper.get(`[id="${describedBy}"]`).text()).toBe('До 200 символов')
    expect(input.attributes('aria-invalid')).toBeUndefined()
  })

  it('ошибка заменяет подсказку и помечает поле невалидным', () => {
    const wrapper = mount(AppInput, {
      props: { label: 'Название', hint: 'До 200 символов', error: 'Обязательное поле' },
    })
    const input = wrapper.get('input')

    expect(input.attributes('aria-invalid')).toBe('true')
    expect(wrapper.get(`[id="${input.attributes('aria-describedby')}"]`).text()).toBe(
      'Обязательное поле',
    )
    expect(wrapper.text()).not.toContain('До 200 символов')
  })

  it('отдаёт class корню, а остальные атрибуты — полю', () => {
    const wrapper = mount(AppInput, {
      props: { label: 'Почта' },
      attrs: { class: 'wide', name: 'email', autocomplete: 'email' },
    })
    const input = wrapper.get('input')

    expect(wrapper.classes()).toContain('wide')
    expect(input.classes()).not.toContain('wide')
    expect(input.attributes('name')).toBe('email')
    expect(input.attributes('autocomplete')).toBe('email')
  })

  it('работает через v-model', async () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
      },
    })

    await wrapper.get('input').setValue('Пробежка')

    expect(wrapper.props('modelValue')).toBe('Пробежка')
  })
})
