<script setup lang="ts">
/** Витрина типографики: словесный знак и все стили текста дизайн-системы. */
import DevSection from '../DevSection.vue'

const STYLES = [
  { name: 'display', sample: 'Сегодня, 18 октября' },
  { name: 'h1', sample: 'Пробежать полумарафон' },
  { name: 'h2', sample: 'Проекты цели' },
  { name: 'h3', sample: 'Утренняя пробежка 5 км' },
  { name: 'body', sample: 'Разбейте цель на проекты, а проекты — на задачи.' },
  { name: 'body-strong', sample: 'Ещё 3 задачи до награды' },
  { name: 'small', sample: 'Срок: завтра, 09:00' },
  { name: 'label', sample: 'Название задачи' },
  { name: 'caption', sample: 'Адепт' },
  { name: 'numeric', sample: '1 248' },
  { name: 'numeric-lg', sample: '12 480' },
]
</script>

<template>
  <DevSection id="typography" title="Типографика">
    <p class="mv-wordmark">MILVIV</p>
    <div v-for="style in STYLES" :key="style.name" class="mv-typography-section__row">
      <code class="mv-dev-section__caption">.mv-{{ style.name }}</code>
      <p :class="`mv-${style.name}`">{{ style.sample }}</p>
    </div>
  </DevSection>
</template>

<style scoped>
.mv-typography-section__row {
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: baseline;
  gap: var(--space-4);
}
</style>
