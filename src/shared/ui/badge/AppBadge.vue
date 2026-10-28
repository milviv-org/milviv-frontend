<script setup lang="ts">
/**
 * Короткая метка рядом с объектом: статус, срок. Иконка и текст — в слоте.
 * Доменные бейджи (статус задачи, сложность) собираются из него в entities: здесь только тоны,
 * без знания о задачах.
 */
import type { BadgeTone } from '../types'

withDefaults(
  defineProps<{
    /** Смысл метки. `neutral` — по умолчанию: цвет должен что-то значить, а не украшать. */
    tone?: BadgeTone
  }>(),
  { tone: 'neutral' },
)

defineSlots<{
  /** Иконка и текст. Иконка обязательна для success/danger: различие не только цветом. */
  default(): unknown
}>()
</script>

<template>
  <span class="mv-badge" :class="`mv-badge--${tone}`"><slot /></span>
</template>

<style scoped>
.mv-badge {
  --mv-icon-size: 14px;
  --mv-icon-stroke: 2;

  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  height: 22px;
  padding: 0 var(--space-2);
  border-radius: var(--radius-sm);
  font: var(--font-caption);
  letter-spacing: var(--tracking-caption);
  white-space: nowrap;
  vertical-align: middle;
}

.mv-badge--neutral {
  background: var(--color-surface-hover);
  color: var(--color-text-muted);
}

.mv-badge--accent {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

.mv-badge--success {
  background: var(--color-success-soft);
  color: var(--color-success);
}

.mv-badge--warning {
  background: var(--color-warning-soft);
  color: var(--color-warning);
}

.mv-badge--danger {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}
</style>
