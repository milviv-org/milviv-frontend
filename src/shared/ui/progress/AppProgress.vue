<script setup lang="ts">
/**
 * Полоса прогресса цели или проекта. Подпись количеством («7 из 12 задач») — снаружи,
 * проценты вторичны (дизайн-система, ProgressBar).
 *
 * Заливка двигается `transform`, а не `width`: без перерасчёта раскладки. На 100% заливка
 * становится цветом успеха. Reka Progress даёт `role="progressbar"` и `aria-value*`.
 */
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { computed } from 'vue'

import { toFraction, toPercent } from './progress'

const props = withDefaults(
  defineProps<{
    /** Доля выполнения 0…1. Значения вне диапазона и NaN безопасно приводятся (`toFraction`). */
    value: number
    /** Что измеряет полоса — для скринридера: «Выполнено задач проекта». */
    label: string
    /** `lg` — на странице цели, где полоса главный элемент. */
    size?: 'md' | 'lg'
  }>(),
  { size: 'md' },
)

const fraction = computed(() => toFraction(props.value))
</script>

<template>
  <ProgressRoot
    class="mv-progress"
    :class="[`mv-progress--size-${size}`, { 'mv-progress--complete': fraction === 1 }]"
    :model-value="toPercent(fraction)"
    :max="100"
    :aria-label="label"
  >
    <ProgressIndicator class="mv-progress__fill" :style="{ '--mv-progress-value': fraction }" />
  </ProgressRoot>
</template>

<style scoped>
.mv-progress {
  position: relative;
  width: 100%;
  height: 6px;
  overflow: hidden;
  border-radius: var(--radius-full);
  background: var(--color-surface-active);
}

.mv-progress--size-lg {
  height: 8px;
}

.mv-progress__fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--color-accent);
  transform: translateX(calc((var(--mv-progress-value) - 1) * 100%));
  transition:
    transform var(--duration-slow) var(--ease-standard),
    background-color var(--duration-base) var(--ease-standard);
}

.mv-progress--complete .mv-progress__fill {
  background: var(--color-success);
}

@media (prefers-reduced-motion: reduce) {
  .mv-progress__fill {
    transition: none;
  }
}
</style>
