<script setup lang="ts">
/** Витрина обратной связи: бейджи статусов, прогресс, спиннеры, скелетон, пустое состояние. */
import { ref } from 'vue'
import IconCircleAlert from '~icons/lucide/circle-alert'
import IconCircleCheck from '~icons/lucide/circle-check'
import IconCircleDot from '~icons/lucide/circle-dot'
import IconCircleX from '~icons/lucide/circle-x'
import IconClock from '~icons/lucide/clock'
import IconTarget from '~icons/lucide/target'

import {
  AppBadge,
  AppButton,
  AppEmptyState,
  AppProgress,
  AppSkeleton,
  AppSpinner,
} from '@/shared/ui'

import DevSection from '../DevSection.vue'

const TOTAL = 12
const done = ref(7)
</script>

<template>
  <DevSection id="feedback" title="Бейджи, прогресс, загрузка, пустое состояние">
    <div class="mv-dev-section__row">
      <AppBadge tone="accent"><IconCircleDot />Активна</AppBadge>
      <AppBadge tone="success"><IconCircleCheck />Выполнена</AppBadge>
      <AppBadge><IconCircleX />Отменена</AppBadge>
      <AppBadge tone="danger"><IconCircleAlert />Просрочена</AppBadge>
      <AppBadge tone="warning"><IconClock />Сегодня</AppBadge>
    </div>

    <div class="mv-feedback-section__progress">
      <div class="mv-feedback-section__progress-row">
        <span>Задачи</span>
        <span class="mv-num">
          <strong class="mv-feedback-section__done">{{ done }}</strong> из {{ TOTAL }}
        </span>
      </div>
      <AppProgress :value="done / TOTAL" label="Выполнено задач проекта" />
      <AppProgress :value="done / TOTAL" label="Выполнено задач цели" size="lg" />
      <div class="mv-dev-section__row">
        <AppButton size="sm" :disabled="done === 0" @click="done--">−1</AppButton>
        <AppButton size="sm" :disabled="done === TOTAL" @click="done++">+1</AppButton>
      </div>
    </div>

    <div class="mv-dev-section__row">
      <AppSpinner size="sm" />
      <AppSpinner />
      <AppSpinner size="lg" label="Загрузка" />
    </div>

    <div class="mv-feedback-section__skeleton" role="status" aria-label="Загрузка задач">
      <AppSkeleton shape="circle" width="24px" height="24px" />
      <div>
        <AppSkeleton shape="text" width="70%" />
        <AppSkeleton shape="text" width="40%" />
      </div>
      <AppSkeleton width="72px" height="20px" />
    </div>

    <AppEmptyState
      title="Пока нет целей"
      text="Цель — то, к чему вы идёте месяцами. Разбейте её на проекты и задачи."
    >
      <template #icon><IconTarget /></template>
      <template #action><AppButton variant="primary">Создать цель</AppButton></template>
    </AppEmptyState>
  </DevSection>
</template>

<style scoped>
.mv-feedback-section__progress {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-width: 420px;
}

.mv-feedback-section__progress-row {
  display: flex;
  justify-content: space-between;
  color: var(--color-text-muted);
  font: var(--font-small);
}

.mv-feedback-section__done {
  color: var(--color-text);
}

.mv-feedback-section__skeleton {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-3);
  max-width: 480px;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
}
</style>
