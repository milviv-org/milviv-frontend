<script setup lang="ts">
/**
 * Флажок для настроек и фильтров, которые подтверждаются кнопкой. Если изменение применяется
 * сразу — это AppSwitch. Выполнение задачи — не флажок, а свой контрол в карточке задачи.
 *
 * Почему Reka: тот же вид и поведение, что у остальных контролов (ADR 0010); при `name` Reka
 * добавляет скрытый нативный input, и значение уходит с формой. Подпись — `<label>` вокруг кнопки:
 * клик по тексту переключает флажок.
 */
import { CheckboxRoot } from 'reka-ui'
import { useId } from 'vue'

import { useControlAttrs } from '../lib/useControlAttrs'

defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    /** Подпись. Можно заменить слотом по умолчанию, если нужна разметка. */
    label?: string
    /** Пояснение под подписью мелким текстом: «в 08:00». */
    description?: string
    disabled?: boolean
    /** Ошибка формы: рамка цвета ошибки. Текст ошибки выводит форма. */
    invalid?: boolean
  }>(),
  { label: undefined, description: undefined },
)

const model = defineModel<boolean>({ default: false })

defineSlots<{
  /** Подпись с разметкой вместо `label`. */
  default?(): unknown
}>()

const descriptionId = `${useId()}-description`
const { rootAttrs, controlAttrs } = useControlAttrs()
</script>

<template>
  <label class="mv-checkbox" v-bind="rootAttrs">
    <CheckboxRoot
      v-model="model"
      v-bind="controlAttrs"
      class="mv-checkbox__box"
      :disabled
      :aria-invalid="invalid || undefined"
      :aria-describedby="description ? descriptionId : undefined"
    >
      <svg class="mv-checkbox__mark" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M5.5 10.5l3 3 6-6.5" />
      </svg>
    </CheckboxRoot>
    <span v-if="label || $slots.default || description" class="mv-checkbox__text">
      <span
        ><slot>{{ label }}</slot></span
      >
      <small v-if="description" :id="descriptionId" class="mv-checkbox__description">
        {{ description }}
      </small>
    </span>
  </label>
</template>

<style scoped>
.mv-checkbox {
  display: inline-flex;
  align-items: flex-start;
  gap: var(--space-3);
  font: var(--font-body);
  cursor: pointer;
}

.mv-checkbox:has(.mv-checkbox__box[data-disabled]) {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

.mv-checkbox__box {
  position: relative;
  flex: none;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  padding: 0;
  border: 1.5px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-accent-contrast);
  cursor: inherit;
  transition:
    background-color var(--duration-fast) var(--ease-standard),
    border-color var(--duration-fast) var(--ease-standard),
    transform var(--duration-fast) var(--ease-standard);
}

.mv-checkbox:hover .mv-checkbox__box:not([data-disabled]) {
  border-color: var(--color-text-muted);
}

.mv-checkbox__box[data-state='checked'] {
  border-color: var(--color-accent);
  background: var(--color-accent);
}

.mv-checkbox__box[aria-invalid='true'] {
  border-color: var(--color-danger);
}

.mv-checkbox:active .mv-checkbox__box:not([data-disabled]) {
  transform: scale(0.92);
}

.mv-checkbox__mark {
  position: absolute;
  inset: -1.5px;
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  /* Галочка рисуется: stroke-dashoffset на 20px — единственное исключение из «только transform и opacity». */
  stroke-dasharray: 22;
  stroke-dashoffset: 22;
  transition: stroke-dashoffset var(--duration-base) var(--ease-standard);
}

.mv-checkbox__box[data-state='checked'] .mv-checkbox__mark {
  stroke-dashoffset: 0;
}

.mv-checkbox__text {
  display: flex;
  flex-direction: column;
}

.mv-checkbox__description {
  color: var(--color-text-muted);
  font: var(--font-small);
}

@media (prefers-reduced-motion: reduce) {
  .mv-checkbox:active .mv-checkbox__box:not([data-disabled]) {
    transform: none;
  }
}
</style>
