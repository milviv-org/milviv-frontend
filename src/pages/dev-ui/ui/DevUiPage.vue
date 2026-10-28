<script setup lang="ts">
/**
 * Витрина UI-kit: все компоненты shared/ui во всех состояниях и обеих темах.
 * Зачем: проверить вид и доступность компонента без экрана, который его использует.
 * Только в dev-сборке — маршрут подключается по import.meta.env.DEV (app/router/routes.ts).
 */
import { ThemeSwitch } from '@/features/theme-switch'

import ButtonsSection from './sections/ButtonsSection.vue'
import ControlsSection from './sections/ControlsSection.vue'
import FeedbackSection from './sections/FeedbackSection.vue'
import FieldsSection from './sections/FieldsSection.vue'
import IconsSection from './sections/IconsSection.vue'
import OverlaysSection from './sections/OverlaysSection.vue'
import TokensSection from './sections/TokensSection.vue'
import TypographySection from './sections/TypographySection.vue'

const NAV = [
  { id: 'tokens', label: 'Токены' },
  { id: 'typography', label: 'Типографика' },
  { id: 'icons', label: 'Иконки' },
  { id: 'buttons', label: 'Кнопки' },
  { id: 'fields', label: 'Поля' },
  { id: 'controls', label: 'Контролы' },
  { id: 'feedback', label: 'Обратная связь' },
  { id: 'overlays', label: 'Слои' },
]
</script>

<template>
  <main class="mv-dev-ui-page">
    <header class="mv-dev-ui-page__head">
      <div>
        <h1 class="mv-h1">UI-kit</h1>
        <p class="mv-muted">Компоненты shared/ui по дизайн-системе MILVIV</p>
      </div>
      <ThemeSwitch />
    </header>
    <nav class="mv-dev-ui-page__nav" aria-label="Разделы витрины">
      <a v-for="item in NAV" :key="item.id" :href="`#${item.id}`">{{ item.label }}</a>
    </nav>
    <TokensSection />
    <TypographySection />
    <IconsSection />
    <ButtonsSection />
    <FieldsSection />
    <ControlsSection />
    <FeedbackSection />
    <OverlaysSection />
  </main>
</template>

<style scoped>
@import '@/shared/styles/media.css';

.mv-dev-ui-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  max-width: 1120px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4) var(--space-16);
}

.mv-dev-ui-page__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
}

.mv-dev-ui-page__nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
  font: var(--font-small);
}

@media (--mv-tablet-up) {
  .mv-dev-ui-page {
    padding-inline: var(--space-6);
  }
}

@media (--mv-desktop-up) {
  .mv-dev-ui-page {
    padding: var(--space-12) var(--space-8) var(--space-16);
  }
}
</style>
