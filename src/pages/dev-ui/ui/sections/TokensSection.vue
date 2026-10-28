<script setup lang="ts">
/** Витрина токенов: цвета обеих тем, шесть уровней сложности, тени. Значения берутся из CSS. */
import DevSection from '../DevSection.vue'

const COLOR_GROUPS: { title: string; tokens: string[] }[] = [
  {
    title: 'Поверхности',
    tokens: ['bg', 'surface', 'surface-raised', 'surface-hover', 'surface-active', 'skeleton'],
  },
  { title: 'Линии и текст', tokens: ['border', 'border-strong', 'text', 'text-muted'] },
  { title: 'Акцент', tokens: ['accent', 'accent-hover', 'accent-soft', 'accent-contrast'] },
  {
    title: 'Статусы',
    tokens: ['success', 'success-soft', 'warning', 'warning-soft', 'danger', 'danger-soft'],
  },
]

const DIFFICULTIES = [
  { token: 'novice', name: 'Новичок', points: 2 },
  { token: 'apprentice', name: 'Ученик', points: 3 },
  { token: 'adept', name: 'Адепт', points: 5 },
  { token: 'expert', name: 'Эксперт', points: 8 },
  { token: 'master', name: 'Мастер', points: 10 },
  { token: 'legendary', name: 'Легендарный', points: 20 },
]

const SHADOWS = ['shadow-1', 'shadow-2', 'shadow-3']
</script>

<template>
  <DevSection id="tokens" title="Токены">
    <div v-for="group in COLOR_GROUPS" :key="group.title" class="mv-dev-section__column">
      <h3 class="mv-label">{{ group.title }}</h3>
      <div class="mv-tokens-section__swatches">
        <div v-for="token in group.tokens" :key="token" class="mv-tokens-section__swatch">
          <span class="mv-tokens-section__chip" :style="{ background: `var(--color-${token})` }" />
          <code class="mv-dev-section__caption">--color-{{ token }}</code>
        </div>
      </div>
    </div>

    <div class="mv-dev-section__column">
      <h3 class="mv-label">Сложность</h3>
      <div class="mv-tokens-section__swatches">
        <span
          v-for="level in DIFFICULTIES"
          :key="level.token"
          class="mv-tokens-section__difficulty"
          :style="{
            color: `var(--difficulty-${level.token})`,
            background: `var(--difficulty-${level.token}-soft)`,
          }"
        >
          {{ level.name }} · <span class="mv-num">{{ level.points }}</span>
        </span>
      </div>
    </div>

    <div class="mv-dev-section__column">
      <h3 class="mv-label">Тени</h3>
      <div class="mv-tokens-section__swatches">
        <span
          v-for="shadow in SHADOWS"
          :key="shadow"
          class="mv-tokens-section__shadow"
          :style="{ boxShadow: `var(--${shadow})` }"
        >
          <code class="mv-dev-section__caption">--{{ shadow }}</code>
        </span>
      </div>
    </div>
  </DevSection>
</template>

<style scoped>
.mv-tokens-section__swatches {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.mv-tokens-section__swatch {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  width: 132px;
}

.mv-tokens-section__chip {
  height: 48px;
  border-radius: var(--radius-md);
  box-shadow: inset 0 0 0 1px var(--color-border);
}

.mv-tokens-section__difficulty {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm);
  font: var(--font-caption);
}

.mv-tokens-section__shadow {
  display: grid;
  place-items: center;
  width: 140px;
  height: 72px;
  border-radius: var(--radius-lg);
  background: var(--color-surface-raised);
}
</style>
