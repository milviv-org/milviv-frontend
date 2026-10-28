import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import AppDialog from './AppDialog.vue'

// Поведение Reka (фокус-ловушка, Esc, портал) не тестируем — только свою логику:
// подписи окна и блокировку закрытия через `dismissible`.

function mountDialog(props: { dismissible?: boolean; description?: string } = {}) {
  const wrapper = mount(AppDialog, {
    attachTo: document.body,
    props: {
      title: 'Новая цель',
      open: true,
      'onUpdate:open': (value: boolean) => wrapper.setProps({ open: value }),
      ...props,
    },
    slots: { default: '<input aria-label="Название" />' },
  })
  return wrapper
}

const pressEscape = () =>
  document.activeElement?.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
  )

afterEach(() => {
  document.body.innerHTML = ''
})

describe('AppDialog', () => {
  it('окно подписано заголовком и описанием', async () => {
    mountDialog({ description: 'Цель — то, к чему вы идёте.' })
    await flushPromises()

    const dialog = document.querySelector<HTMLElement>('[role="dialog"]')
    const titleId = dialog?.getAttribute('aria-labelledby')
    const descriptionId = dialog?.getAttribute('aria-describedby')

    expect(document.getElementById(String(titleId))?.textContent).toBe('Новая цель')
    expect(document.getElementById(String(descriptionId))?.textContent).toContain('Цель')
  })

  it('Esc закрывает окно', async () => {
    const wrapper = mountDialog()
    await flushPromises()

    pressEscape()
    await flushPromises()

    expect(wrapper.props('open')).toBe(false)
  })

  it('без dismissible окно не закрывается по Esc и крестика нет', async () => {
    const wrapper = mountDialog({ dismissible: false })
    await flushPromises()

    pressEscape()
    await flushPromises()

    expect(wrapper.props('open')).toBe(true)
    expect(document.querySelector('[aria-label="Закрыть"]')).toBeNull()
  })
})
