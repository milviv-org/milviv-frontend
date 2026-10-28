<script setup lang="ts">
/**
 * Короткая подсказка в одну строку к иконке или сокращению. Триггер — слот по умолчанию: ему
 * передаются обработчики и `aria-describedby` (`as-child`), лишней обёртки в DOM нет.
 *
 * Почему Reka, а не CSS-тултип: подсказка рисуется в портале поверх всего и не обрезается
 * контейнером с `overflow: hidden`, переворачивается у края экрана, закрывается по Esc.
 * Задержку задаёт AppUiProvider. На сенсорных экранах подсказки нет — смысл должен быть понятен без неё.
 */
import { TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from 'reka-ui'

import type { TooltipSide } from '../types'

withDefaults(
  defineProps<{
    /** Текст подсказки. Одна строка, без интерактивных элементов. */
    text: string
    side?: TooltipSide
    /** Отдать только триггер — например, когда подпись уже видна рядом. */
    disabled?: boolean
  }>(),
  { side: 'top' },
)

defineSlots<{
  /** Триггер: один элемент или компонент с одним корнем. */
  default(): unknown
}>()

/** Расстояние от триггера, px. */
const SIDE_OFFSET = 6
</script>

<template>
  <slot v-if="disabled" />
  <TooltipRoot v-else>
    <TooltipTrigger as-child><slot /></TooltipTrigger>
    <TooltipPortal>
      <TooltipContent class="mv-tooltip" :side :side-offset="SIDE_OFFSET" :collision-padding="8">
        {{ text }}
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>

<style scoped>
.mv-tooltip {
  z-index: var(--z-tooltip);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  background: var(--color-text);
  color: var(--color-bg);
  font: var(--font-caption);
  white-space: nowrap;
  transform-origin: var(--reka-tooltip-content-transform-origin);
}

.mv-tooltip[data-state='delayed-open'],
.mv-tooltip[data-state='instant-open'] {
  animation: mv-tooltip-enter var(--duration-fast) var(--ease-enter);
}

.mv-tooltip[data-state='closed'] {
  animation: mv-tooltip-exit var(--duration-fast) var(--ease-exit);
}

@keyframes mv-tooltip-enter {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
}

@keyframes mv-tooltip-exit {
  to {
    opacity: 0;
  }
}

@media (hover: none) {
  .mv-tooltip {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mv-tooltip[data-state='delayed-open'],
  .mv-tooltip[data-state='instant-open'] {
    animation-name: mv-tooltip-fade;
  }

  @keyframes mv-tooltip-fade {
    from {
      opacity: 0;
    }
  }
}
</style>
