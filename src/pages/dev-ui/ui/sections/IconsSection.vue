<script setup lang="ts">
/** Витрина иконок Lucide из набора дизайн-системы и их размеров через --mv-icon-size. */
import IconCalendarDays from '~icons/lucide/calendar-days'
import IconCalendar from '~icons/lucide/calendar'
import IconChartColumn from '~icons/lucide/chart-column'
import IconCheck from '~icons/lucide/check'
import IconChevronDown from '~icons/lucide/chevron-down'
import IconChevronLeft from '~icons/lucide/chevron-left'
import IconChevronRight from '~icons/lucide/chevron-right'
import IconCircleAlert from '~icons/lucide/circle-alert'
import IconCircleCheck from '~icons/lucide/circle-check'
import IconCircleDot from '~icons/lucide/circle-dot'
import IconCircleX from '~icons/lucide/circle-x'
import IconClock from '~icons/lucide/clock'
import IconEllipsis from '~icons/lucide/ellipsis'
import IconFlag from '~icons/lucide/flag'
import IconFolderKanban from '~icons/lucide/folder-kanban'
import IconGem from '~icons/lucide/gem'
import IconGift from '~icons/lucide/gift'
import IconInfo from '~icons/lucide/info'
import IconListChecks from '~icons/lucide/list-checks'
import IconPencil from '~icons/lucide/pencil'
import IconPlus from '~icons/lucide/plus'
import IconRepeat from '~icons/lucide/repeat'
import IconSearch from '~icons/lucide/search'
import IconSettings from '~icons/lucide/settings'
import IconSparkles from '~icons/lucide/sparkles'
import IconSun from '~icons/lucide/sun'
import IconTarget from '~icons/lucide/target'
import IconTrash from '~icons/lucide/trash-2'
import IconX from '~icons/lucide/x'

import DevSection from '../DevSection.vue'

// Набор дизайн-системы: разделы навигации, затем служебные.
const ICONS = [
  { name: 'sun', hint: 'Сегодня', component: IconSun },
  { name: 'list-checks', hint: 'Задачи', component: IconListChecks },
  { name: 'folder-kanban', hint: 'Проекты', component: IconFolderKanban },
  { name: 'target', hint: 'Цели', component: IconTarget },
  { name: 'calendar', hint: 'Календарь', component: IconCalendar },
  { name: 'gift', hint: 'Награды', component: IconGift },
  { name: 'chart-column', hint: 'Статистика', component: IconChartColumn },
  { name: 'sparkles', hint: 'Ассистент', component: IconSparkles },
  { name: 'settings', hint: 'Настройки', component: IconSettings },
  { name: 'ellipsis', hint: 'Ещё', component: IconEllipsis },
  { name: 'gem', hint: 'Баллы', component: IconGem },
  { name: 'plus', component: IconPlus },
  { name: 'x', component: IconX },
  { name: 'check', component: IconCheck },
  { name: 'chevron-down', component: IconChevronDown },
  { name: 'chevron-left', component: IconChevronLeft },
  { name: 'chevron-right', component: IconChevronRight },
  { name: 'clock', component: IconClock },
  { name: 'calendar-days', component: IconCalendarDays },
  { name: 'trash-2', component: IconTrash },
  { name: 'pencil', component: IconPencil },
  { name: 'search', component: IconSearch },
  { name: 'info', component: IconInfo },
  { name: 'circle-check', component: IconCircleCheck },
  { name: 'circle-alert', component: IconCircleAlert },
  { name: 'circle-x', component: IconCircleX },
  { name: 'circle-dot', component: IconCircleDot },
  { name: 'repeat', component: IconRepeat },
  { name: 'flag', component: IconFlag },
]
</script>

<template>
  <DevSection id="icons" title="Иконки · Lucide, обводка 1.75">
    <ul class="mv-icons-section__list">
      <li v-for="icon in ICONS" :key="icon.name" class="mv-icons-section__cell">
        <component :is="icon.component" />
        <code class="mv-dev-section__caption">{{ icon.name }}</code>
        <span v-if="icon.hint" class="mv-dev-section__caption">{{ icon.hint }}</span>
      </li>
    </ul>
    <div class="mv-dev-section__row">
      <span class="mv-dev-section__caption">Размеры:</span>
      <IconTarget style="--mv-icon-size: 14px" />
      <IconTarget style="--mv-icon-size: 16px" />
      <IconTarget />
      <IconTarget style="--mv-icon-size: 24px" />
    </div>
  </DevSection>
</template>

<style scoped>
.mv-icons-section__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(112px, 1fr));
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.mv-icons-section__cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-2);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  text-align: center;
}
</style>
