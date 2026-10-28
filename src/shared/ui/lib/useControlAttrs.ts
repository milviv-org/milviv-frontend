import { computed, useAttrs, type ComputedRef } from 'vue'

/** Атрибуты, которые описывают раскладку компонента, а не сам контрол. */
const ROOT_ATTRS = new Set(['class', 'style'])

/**
 * Делит атрибуты поля ввода между корнем и контролом.
 *
 * Зачем: поле обёрнуто в подпись и подсказку. `class` и `style` от родителя относятся к раскладке
 * (ширина, место в сетке) и должны попасть на корень, а `name`, `autocomplete`, `inputmode`
 * и обработчики — на сам `input`, иначе формы и автозаполнение не работают.
 * Компонент обязан объявить `defineOptions({ inheritAttrs: false })`.
 */
export function useControlAttrs(): {
  rootAttrs: ComputedRef<Record<string, unknown>>
  controlAttrs: ComputedRef<Record<string, unknown>>
} {
  const attrs = useAttrs()

  const rootAttrs = computed(() => ({ class: attrs.class, style: attrs.style }))
  const controlAttrs = computed(() =>
    Object.fromEntries(Object.entries(attrs).filter(([name]) => !ROOT_ATTRS.has(name))),
  )

  return { rootAttrs, controlAttrs }
}
