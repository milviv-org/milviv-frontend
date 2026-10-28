<script setup lang="ts">
/**
 * Общие настройки UI-kit. Оборачивает приложение один раз — в `App.vue`.
 *
 * Зачем: тултипы делят общий таймер. Первый появляется через 400 мс (дизайн-система), а соседние,
 * пока курсор идёт по панели иконок, — сразу, как в нативных приложениях. Тултип при фокусе мышью
 * не показывается: он нужен клавиатуре и наведению, а не клику.
 */
import { TooltipProvider } from 'reka-ui'

/** Задержка первого тултипа при наведении (дизайн-система, Tooltip). */
const TOOLTIP_DELAY_MS = 400
/** Сколько после закрытия тултипа соседний открывается без задержки. */
const TOOLTIP_SKIP_DELAY_MS = 300
</script>

<template>
  <TooltipProvider
    :delay-duration="TOOLTIP_DELAY_MS"
    :skip-delay-duration="TOOLTIP_SKIP_DELAY_MS"
    ignore-non-keyboard-focus
  >
    <slot />
  </TooltipProvider>
</template>
