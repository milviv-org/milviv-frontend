<script setup lang="ts" generic="T extends string">
/**
 * Выбор одного значения из списка: проект, цель, повтор, сложность.
 *
 * Почему Reka Select, а не нативный `<select>`: единый вид и поведение на всех платформах, пункты
 * с иконками и описаниями, отключённые пункты в стиле дизайн-системы (ADR 0010). Ценой — системный
 * список на мобильном: вместо него выпадающая панель, рассчитанная на касание (высота пункта 44px).
 * При `name` Reka добавляет скрытый нативный элемент, и значение уходит с обычной формой.
 */
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import IconCheck from '~icons/lucide/check'
import IconChevronDown from '~icons/lucide/chevron-down'

import { findOption } from '../lib/choice'
import { useControlAttrs } from '../lib/useControlAttrs'
import type { ChoiceOption, ControlSize } from '../types'

import AppField from './AppField.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** Варианты. До ~8; больше или нужен поиск — нужен будущий AppCombobox. */
    options: readonly ChoiceOption<T>[]
    /** Подпись над полем (AppField). */
    label?: string
    /** Подсказка под полем (AppField). */
    hint?: string
    /** Текст ошибки (AppField). */
    error?: string
    /** Пометка «необязательно» (AppField). */
    optional?: boolean
    id?: string
    /** Текст, пока ничего не выбрано (`null`). */
    placeholder?: string
    size?: ControlSize
    disabled?: boolean
  }>(),
  {
    label: undefined,
    hint: undefined,
    error: undefined,
    id: undefined,
    placeholder: undefined,
    size: 'md',
  },
)

/** `null` — ничего не выбрано: показывается `placeholder`. */
const model = defineModel<T | null>({ default: null })

const { rootAttrs, controlAttrs } = useControlAttrs()

function onUpdate(value: unknown): void {
  const option = findOption(props.options, value)
  if (option) model.value = option.value
}
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
    <SelectRoot :model-value="model" :disabled @update:model-value="onUpdate">
      <div class="mv-control mv-control--with-trail" :class="`mv-control--size-${size}`">
        <SelectTrigger
          :id="controlId"
          v-bind="controlAttrs"
          class="mv-control__input mv-select__trigger"
          :aria-invalid="invalid || undefined"
          :aria-describedby="describedBy"
        >
          <SelectValue class="mv-select__value" :placeholder />
        </SelectTrigger>
        <span class="mv-control__trail"><IconChevronDown /></span>
      </div>
      <SelectPortal>
        <SelectContent
          class="mv-select__content"
          position="popper"
          :side-offset="4"
          :collision-padding="8"
        >
          <SelectViewport class="mv-select__viewport">
            <SelectItem
              v-for="option in options"
              :key="option.value"
              class="mv-select__item"
              :value="option.value"
              :disabled="option.disabled"
            >
              <SelectItemText>{{ option.label }}</SelectItemText>
              <SelectItemIndicator class="mv-select__indicator"><IconCheck /></SelectItemIndicator>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </AppField>
</template>

<style scoped src="./control.css"></style>

<style scoped>
@import '@/shared/styles/media.css';

.mv-select__trigger {
  cursor: pointer;
}

.mv-select__value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mv-select__trigger[data-placeholder] .mv-select__value {
  color: var(--color-text-muted);
}

.mv-select__content {
  --mv-icon-size: 16px;

  z-index: var(--z-dropdown);
  width: var(--reka-select-trigger-width);
  max-height: min(320px, var(--reka-select-content-available-height));
  padding: 4px;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--color-surface-raised);
  box-shadow:
    var(--shadow-2),
    0 0 0 1px var(--color-border);
  color: var(--color-text);
  transform-origin: var(--reka-select-content-transform-origin);
}

.mv-select__content[data-state='open'] {
  animation: mv-select-enter var(--duration-base) var(--ease-enter);
}

.mv-select__content[data-state='closed'] {
  animation: mv-select-exit var(--duration-fast) var(--ease-exit);
}

.mv-select__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  height: 36px;
  padding: 0 10px;
  border-radius: var(--radius-sm);
  font: var(--font-body);
  cursor: pointer;
  outline: none;
  user-select: none;
}

.mv-select__item[data-highlighted] {
  background: var(--color-surface-hover);
}

.mv-select__item[data-state='checked'] {
  font-weight: 600;
}

.mv-select__item[data-disabled] {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

.mv-select__indicator {
  display: flex;
  color: var(--color-accent);
}

@keyframes mv-select-enter {
  from {
    opacity: 0;
    transform: scale(0.97) translateY(-4px);
  }
}

@keyframes mv-select-exit {
  to {
    opacity: 0;
  }
}

/* Мобильный: пункт — полноценная зона касания. */
@media (--mv-mobile) {
  .mv-select__item {
    height: var(--touch-target);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mv-select__content[data-state='open'] {
    animation-name: mv-select-fade;
  }

  @keyframes mv-select-fade {
    from {
      opacity: 0;
    }
  }
}
</style>
