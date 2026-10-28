<script setup lang="ts" generic="T extends string">
/**
 * Сегменты: выбор одного из 2–4 вариантов, которые видны сразу (День / Неделя / Месяц, тема).
 *
 * Почему RadioGroup, а не Tabs: сегменты меняют настройку или режим, а не показывают отдельную
 * панель. Семантика radiogroup честнее: стрелки выбирают вариант, Tab выходит из группы (ADR 0010).
 */
import { RadioGroupItem, RadioGroupRoot } from 'reka-ui'

import { findOption } from '../lib/choice'
import type { ChoiceOption } from '../types'

const props = defineProps<{
  options: readonly ChoiceOption<T>[]
  /** Имя группы для скринридера: «Период», «Тема оформления». */
  label: string
}>()

const model = defineModel<T>({ required: true })

function onUpdate(value: unknown): void {
  const option = findOption(props.options, value)
  if (option) model.value = option.value
}
</script>

<template>
  <RadioGroupRoot
    class="mv-segmented"
    :model-value="model"
    orientation="horizontal"
    :aria-label="label"
    @update:model-value="onUpdate"
  >
    <RadioGroupItem
      v-for="option in options"
      :key="option.value"
      class="mv-segmented__item"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </RadioGroupItem>
  </RadioGroupRoot>
</template>

<style scoped>
.mv-segmented {
  display: inline-flex;
  gap: 2px;
  padding: 3px;
  border-radius: var(--radius-md);
  background: var(--color-surface-hover);
}

.mv-segmented__item {
  height: 30px;
  padding: 0 var(--space-3);
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--color-text-muted);
  font: var(--font-label);
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-standard),
    color var(--duration-fast) var(--ease-standard),
    transform var(--duration-fast) var(--ease-standard);
}

.mv-segmented__item:hover:not([data-disabled]) {
  color: var(--color-text);
}

.mv-segmented__item:active:not([data-disabled]) {
  transform: scale(0.97);
}

.mv-segmented__item[data-disabled] {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

.mv-segmented__item[data-state='checked'] {
  background: var(--color-surface);
  box-shadow: var(--shadow-1);
  color: var(--color-text);
}

[data-theme='dark'] .mv-segmented__item[data-state='checked'] {
  background: var(--color-surface-active);
}

@media (prefers-reduced-motion: reduce) {
  .mv-segmented__item:active:not([data-disabled]) {
    transform: none;
  }
}
</style>
