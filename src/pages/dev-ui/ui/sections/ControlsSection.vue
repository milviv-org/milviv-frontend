<script setup lang="ts">
/** Витрина флажков, переключателей, вкладок и сегментов во всех состояниях. */
import { ref } from 'vue'

import { AppCheckbox, AppSegmented, AppSwitch, AppTabs, type TabItem } from '@/shared/ui'

import DevSection from '../DevSection.vue'

type TaskTab = 'active' | 'done' | 'overdue' | 'cancelled'
type Period = 'day' | 'week' | 'month'

const TABS: readonly TabItem<TaskTab>[] = [
  { value: 'active', label: 'Активные', count: 12 },
  { value: 'done', label: 'Выполненные', count: 48 },
  { value: 'overdue', label: 'Просроченные', count: 2 },
  { value: 'cancelled', label: 'Отменённые', disabled: true },
]

const PERIODS = [
  { value: 'day', label: 'День' },
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
] as const

const morning = ref(true)
const evening = ref(false)
const sound = ref(true)
const reminders = ref(false)
const tab = ref<TaskTab>('active')
const period = ref<Period>('week')
</script>

<template>
  <DevSection id="controls" title="Флажки, переключатели, вкладки">
    <div class="mv-dev-section__grid">
      <div class="mv-dev-section__column">
        <AppCheckbox v-model="morning" label="Напоминать утром" description="в 08:00" />
        <AppCheckbox v-model="evening" label="Напоминать вечером" />
        <AppCheckbox :model-value="false" label="С ошибкой" invalid />
        <AppCheckbox model-value label="Отключён" disabled />
      </div>
      <div class="mv-dev-section__column">
        <AppSwitch v-model="sound" label="Звук поощрений" />
        <AppSwitch v-model="reminders" label="Напоминания" description="Пока приложение открыто" />
        <AppSwitch model-value label="Отключён" disabled />
      </div>
    </div>

    <AppTabs v-model="tab" :items="TABS" label="Задачи по статусу">
      <template #default="{ value }">
        <p class="mv-controls-section__panel">Панель вкладки: {{ value }}</p>
      </template>
    </AppTabs>

    <div class="mv-dev-section__row">
      <AppSegmented v-model="period" :options="PERIODS" label="Период" />
      <span class="mv-dev-section__caption">{{ period }}</span>
    </div>
  </DevSection>
</template>

<style scoped>
.mv-controls-section__panel {
  padding-top: var(--space-4);
  color: var(--color-text-muted);
}
</style>
