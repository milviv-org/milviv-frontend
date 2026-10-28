<script setup lang="ts">
/**
 * Пустой экран или список: объясняет, почему пусто, и даёт один следующий шаг.
 * Без иллюстраций — только иконка раздела (дизайн-система, EmptyState). Первый запуск — primary
 * «Создать…»; «всё сделано» — спокойная secondary: это повод выдохнуть, а не пустота.
 */
withDefaults(
  defineProps<{
    /** Что случилось: «Пока нет целей», «Ничего не найдено». */
    title: string
    /** Почему и что делать, 1–2 предложения. */
    text?: string
    /** Уровень заголовка по месту на экране: у пустого экрана — `h2`, у пустого блока — `h3`. */
    titleTag?: 'h2' | 'h3' | 'p'
  }>(),
  { text: undefined, titleTag: 'h3' },
)

defineSlots<{
  /** Линейная иконка раздела. */
  icon?(): unknown
  /** Одна кнопка следующего шага. */
  action?(): unknown
}>()
</script>

<template>
  <div class="mv-empty-state">
    <span v-if="$slots.icon" class="mv-empty-state__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
    <component :is="titleTag" class="mv-empty-state__title">{{ title }}</component>
    <p v-if="text" class="mv-empty-state__text">{{ text }}</p>
    <slot name="action" />
  </div>
</template>

<style scoped>
.mv-empty-state {
  --mv-icon-size: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  max-width: 360px;
  margin: 0 auto;
  padding: var(--space-10) var(--space-6);
  text-align: center;
}

.mv-empty-state__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: var(--space-2);
  border-radius: 50%;
  background: var(--color-surface-hover);
  color: var(--color-text-muted);
}

.mv-empty-state__title {
  font: var(--font-h3);
}

.mv-empty-state__text {
  margin-bottom: var(--space-3);
  color: var(--color-text-muted);
}
</style>
