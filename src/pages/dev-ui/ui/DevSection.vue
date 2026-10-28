<script setup lang="ts">
/**
 * Секция витрины UI-kit с заголовком и якорем для навигации.
 * Даёт секциям общие элементы раскладки: `mv-dev-section__row` (ряд), `__grid` (сетка карточек),
 * `__caption` (подпись) — чтобы восемь секций не повторяли одни и те же стили.
 */
defineProps<{
  /** Заголовок секции. */
  title: string
  /** Якорь: ссылка из навигации витрины ведёт на `#id`. */
  id: string
}>()

defineSlots<{
  /** Примеры компонентов. */
  default(): unknown
}>()
</script>

<template>
  <section :id class="mv-dev-section" :aria-labelledby="`${id}-title`">
    <h2 :id="`${id}-title`" class="mv-h2">{{ title }}</h2>
    <slot />
  </section>
</template>

<style scoped>
.mv-dev-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  scroll-margin-top: var(--space-4);
}

/* Элементы блока отрисованы в слоте секций — поэтому :deep (CONVENTIONS, 6.2). */
.mv-dev-section :deep(.mv-dev-section__row) {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
}

.mv-dev-section :deep(.mv-dev-section__grid) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-5);
}

.mv-dev-section :deep(.mv-dev-section__column) {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.mv-dev-section :deep(.mv-dev-section__caption) {
  color: var(--color-text-muted);
  font: var(--font-caption);
}
</style>
