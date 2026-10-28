<script setup lang="ts">
/**
 * Подпись, подсказка и ошибка вокруг контрола — основа всех полей форм.
 *
 * Зачем отдельный компонент: связи для скринридера (`for`, `aria-describedby`, `aria-invalid`)
 * одинаковы у всех полей. Они вычисляются здесь и отдаются контролу через слот, а не повторяются
 * в каждом поле. Что показать под полем — решает `resolveFieldMessage`.
 */
import { computed, useId } from 'vue'
import IconCircleAlert from '~icons/lucide/circle-alert'

import { resolveFieldMessage } from './field-message'

const props = defineProps<{
  /** Подпись над полем. Всегда видна: placeholder — только пример, не замена подписи. */
  label?: string
  /** Подсказка под полем: формат, ограничение («До 200 символов»). */
  hint?: string
  /** Текст ошибки. Показывайте после blur или отправки, а не на каждый символ. */
  error?: string
  /** Добавляет к подписи «— необязательно»: обязательные поля встречаются чаще, помечаем редкие. */
  optional?: boolean
  /** Свой id контрола; по умолчанию генерируется. Нужен, если на поле ссылается внешний элемент. */
  id?: string
}>()

defineSlots<{
  /** Контрол. Свяжите его: `:id="id"`, `:aria-describedby="describedBy"`, `:aria-invalid="invalid"`. */
  default(props: { id: string; describedBy: string | undefined; invalid: boolean }): unknown
}>()

const autoId = useId()
const controlId = computed(() => props.id ?? autoId)
const messageId = `${autoId}-message`
const message = computed(() => resolveFieldMessage(props.error, props.hint))
</script>

<template>
  <div class="mv-field">
    <label v-if="label" class="mv-field__label" :for="controlId">
      {{ label }}
      <span v-if="optional" class="mv-field__optional">— необязательно</span>
    </label>
    <slot
      :id="controlId"
      :described-by="message ? messageId : undefined"
      :invalid="message?.kind === 'error'"
    />
    <p
      v-if="message"
      :id="messageId"
      class="mv-field__message"
      :class="`mv-field__message--${message.kind}`"
    >
      <IconCircleAlert v-if="message.kind === 'error'" />
      <span>{{ message.text }}</span>
    </p>
  </div>
</template>

<style scoped>
.mv-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.mv-field__label {
  color: var(--color-text);
  font: var(--font-label);
}

.mv-field__optional {
  color: var(--color-text-muted);
  font-weight: 450;
}

.mv-field__message {
  --mv-icon-size: 16px;

  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: var(--color-text-muted);
  font: var(--font-small);
}

.mv-field__message--error {
  color: var(--color-danger);
}

.mv-field__message .mv-icon {
  margin-top: 2px;
}
</style>
