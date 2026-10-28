<script setup lang="ts">
/**
 * Переключатель настройки, которая применяется сразу, без кнопки «Сохранить»: тема, звук,
 * уведомления. Если изменение подтверждается кнопкой — это AppCheckbox.
 * Reka даёт `role="switch"` и клавиатуру (ADR 0010); подпись — `<label>` вокруг.
 */
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { useId } from 'vue'

import { useControlAttrs } from '../lib/useControlAttrs'

defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    /** Подпись описывает включённое состояние: «Звук поощрений», а не «Выключить звук». */
    label?: string
    /** Пояснение под подписью: последствия включения. */
    description?: string
    disabled?: boolean
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
  <label class="mv-switch" v-bind="rootAttrs">
    <SwitchRoot
      v-model="model"
      v-bind="controlAttrs"
      class="mv-switch__track"
      :disabled
      :aria-describedby="description ? descriptionId : undefined"
    >
      <SwitchThumb class="mv-switch__thumb" />
    </SwitchRoot>
    <span v-if="label || $slots.default || description" class="mv-switch__text">
      <span
        ><slot>{{ label }}</slot></span
      >
      <small v-if="description" :id="descriptionId" class="mv-switch__description">
        {{ description }}
      </small>
    </span>
  </label>
</template>

<style scoped>
.mv-switch {
  --mv-switch-thumb-scale: 1;

  display: inline-flex;
  align-items: flex-start;
  gap: var(--space-3);
  font: var(--font-body);
  cursor: pointer;
}

.mv-switch:has(.mv-switch__track[data-disabled]) {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

.mv-switch:hover:not(:has([data-disabled])) {
  --mv-switch-thumb-scale: 1.06;
}

.mv-switch:active:not(:has([data-disabled])) {
  --mv-switch-thumb-scale: 0.92;
}

.mv-switch__track {
  position: relative;
  flex: none;
  width: 40px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: var(--radius-full);
  background: var(--color-border-strong);
  cursor: inherit;
  transition: background-color var(--duration-base) var(--ease-standard);
}

.mv-switch__track[data-state='checked'] {
  background: var(--color-accent);
}

.mv-switch__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-surface);
  box-shadow: var(--shadow-1);
  transform: scale(var(--mv-switch-thumb-scale));
  transition: transform var(--duration-base) var(--ease-standard);
}

.mv-switch__thumb[data-state='checked'] {
  transform: translateX(16px) scale(var(--mv-switch-thumb-scale));
}

/* В тёмной теме акцент светлый — ползунок на нём тёмный. */
[data-theme='dark'] .mv-switch__thumb[data-state='checked'] {
  background: var(--color-accent-contrast);
}

.mv-switch__text {
  display: flex;
  flex-direction: column;
}

.mv-switch__description {
  color: var(--color-text-muted);
  font: var(--font-small);
}

@media (prefers-reduced-motion: reduce) {
  .mv-switch__thumb {
    transition: none;
  }
}
</style>
