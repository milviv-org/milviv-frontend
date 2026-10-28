<script setup lang="ts">
/**
 * Плашка загрузки той же формы, что будущий контент: при загрузке ничего не прыгает.
 * Плашка скрыта от скринридера; контейнер скелетона объявляет `role="status"` и
 * `aria-label="Загрузка …"`. Показывайте, если загрузка дольше 300 мс, не больше 3–5 повторов.
 */
withDefaults(
  defineProps<{
    /** `text` — строка текста с отступами строки; `circle` — вместо чекбокса или аватара. */
    shape?: 'text' | 'rect' | 'circle'
    /** CSS-ширина: `'70%'`, `'72px'`. По умолчанию — во всю ширину. */
    width?: string
    /** CSS-высота. У `text` есть своя. */
    height?: string
  }>(),
  { shape: 'rect', width: undefined, height: undefined },
)
</script>

<template>
  <span
    class="mv-skeleton"
    :class="`mv-skeleton--shape-${shape}`"
    :style="{ width, height }"
    aria-hidden="true"
  />
</template>

<style scoped>
.mv-skeleton {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: var(--radius-sm);
  background: var(--color-skeleton);
}

.mv-skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, var(--color-surface-hover), transparent);
  opacity: 0.8;
  transform: translateX(-100%);
  animation: mv-skeleton-shimmer 1.4s var(--ease-standard) infinite;
}

.mv-skeleton--shape-text {
  height: 12px;
  margin: 6px 0;
}

.mv-skeleton--shape-circle {
  border-radius: 50%;
}

@keyframes mv-skeleton-shimmer {
  to {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mv-skeleton::after {
    animation: none;
    opacity: 0;
  }
}
</style>
