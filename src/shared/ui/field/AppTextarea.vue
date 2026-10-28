<script setup lang="ts">
/**
 * Многострочное поле с подписью: описание задачи, ответы рефлексии.
 * Высота меняется вручную только по вертикали: ширину задаёт раскладка формы.
 */
import { useControlAttrs } from '../lib/useControlAttrs'

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
    placeholder?: string
    /** Начальная высота в строках. */
    rows?: number
    disabled?: boolean
  }>(),
  {
    label: undefined,
    hint: undefined,
    error: undefined,
    id: undefined,
    placeholder: undefined,
    rows: 4,
  },
)

const model = defineModel<string>({ default: '' })

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
    <div class="mv-control mv-control--multiline">
      <textarea
        :id="controlId"
        v-model="model"
        v-bind="controlAttrs"
        class="mv-control__input"
        :rows
        :placeholder
        :disabled
        :aria-invalid="invalid || undefined"
        :aria-describedby="describedBy"
      />
    </div>
  </AppField>
</template>

<style scoped src="./control.css"></style>
