<script setup lang="ts">
/**
 * Однострочное поле с подписью: название, почта, поиск.
 * Атрибуты `name`, `autocomplete`, `inputmode` и обработчики уходят на `input`, `class` — на корень
 * (`useControlAttrs`): так поле работает с автозаполнением и формами, а родитель управляет раскладкой.
 */
import AppSpinner from '../spinner/AppSpinner.vue'
import { useControlAttrs } from '../lib/useControlAttrs'
import type { ControlSize } from '../types'

import AppField from './AppField.vue'

defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    /** Подпись над полем (AppField). */
    label?: string
    /** Подсказка под полем (AppField). */
    hint?: string
    /** Текст ошибки (AppField). */
    error?: string
    /** Пометка «необязательно» (AppField). */
    optional?: boolean
    id?: string
    /** Тип нативного поля: включает нужную клавиатуру на мобильном и автозаполнение. */
    type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
    size?: ControlSize
    /** Пример значения. Не заменяет подпись: исчезает при вводе. */
    placeholder?: string
    disabled?: boolean
    /** Идёт проверка значения (например, занятость имени) — спиннер на месте иконки справа. */
    loading?: boolean
  }>(),
  {
    label: undefined,
    hint: undefined,
    error: undefined,
    id: undefined,
    type: 'text',
    size: 'md',
    placeholder: undefined,
  },
)

const model = defineModel<string>({ default: '' })

const slots = defineSlots<{
  /** Иконка слева: поиск, дата. */
  lead?(): unknown
  /** Иконка справа. Скрывается во время `loading`. */
  trail?(): unknown
}>()

const { rootAttrs, controlAttrs } = useControlAttrs()
</script>

<template>
  <AppField
    v-bind="rootAttrs"
    :id
    v-slot="{ id: controlId, describedBy, invalid }"
    :label
    :hint
    :error
    :optional
  >
    <div
      class="mv-control"
      :class="[
        `mv-control--size-${size}`,
        {
          'mv-control--with-lead': slots.lead,
          'mv-control--with-trail': loading || slots.trail,
        },
      ]"
    >
      <span v-if="slots.lead" class="mv-control__lead"><slot name="lead" /></span>
      <input
        :id="controlId"
        v-model="model"
        v-bind="controlAttrs"
        class="mv-control__input"
        :type
        :placeholder
        :disabled
        :aria-invalid="invalid || undefined"
        :aria-describedby="describedBy"
        :aria-busy="loading || undefined"
      />
      <span v-if="loading" class="mv-control__trail"><AppSpinner size="sm" /></span>
      <span v-else-if="slots.trail" class="mv-control__trail"><slot name="trail" /></span>
    </div>
  </AppField>
</template>

<style scoped src="./control.css"></style>
