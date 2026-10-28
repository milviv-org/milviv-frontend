<script setup lang="ts">
/**
 * Кнопка только с иконкой. Подпись обязательна: она становится `aria-label` и текстом тултипа,
 * поэтому кнопка без текста всегда понятна и скринридеру, и мыши.
 *
 * Почему `inheritAttrs: false`: корень компонента — тултип без своего DOM. Атрибуты от родителя
 * (`class` для микса, атрибуты триггера меню из `as-child`) должны попасть на саму кнопку.
 */
import AppTooltip from '../tooltip/AppTooltip.vue'
import type { ButtonVariant, ControlSize, TooltipSide } from '../types'

import AppButton from './AppButton.vue'

defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    /** Что делает кнопка, глаголом: «Изменить», «Удалить». */
    label: string
    /** По умолчанию `ghost`: иконки обычно стоят в панелях и карточках как третичные действия. */
    variant?: ButtonVariant
    size?: ControlSize
    type?: 'button' | 'submit' | 'reset'
    loading?: boolean
    disabled?: boolean
    /** Где показать тултип; `false` — без тултипа (крестик в заголовке диалога и так понятен). */
    tooltip?: TooltipSide | false
  }>(),
  { variant: 'ghost', size: 'md', type: 'button', tooltip: 'top' },
)

const emit = defineEmits<{
  /** Нажатие. Не приходит во время `loading`. */
  click: [event: MouseEvent]
}>()
</script>

<template>
  <AppTooltip :text="label" :side="tooltip || undefined" :disabled="!tooltip">
    <AppButton
      v-bind="$attrs"
      :variant
      :size
      :type
      :loading
      :disabled
      :aria-label="label"
      square
      @click="emit('click', $event)"
    >
      <slot />
    </AppButton>
  </AppTooltip>
</template>
