<script setup lang="ts" generic="T extends string">
/**
 * Вкладки переключают вид одного набора данных (Активные / Выполненные), а не разделы приложения —
 * для разделов навигация. Не больше 5 вкладок.
 *
 * Reka даёт роли tablist/tab/tabpanel, стрелки/Home/End и связь вкладки с панелью (ADR 0010).
 * Выбор следует за фокусом (automatic activation): данные вкладок уже на клиенте, ждать нечего.
 * Панель одна, её содержимое — слот со значением выбранной вкладки.
 */
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'

import { findOption } from '../lib/choice'
import type { TabItem } from '../types'

const props = defineProps<{
  items: readonly TabItem<T>[]
  /** Имя группы вкладок для скринридера: «Задачи по статусу». */
  label: string
}>()

const model = defineModel<T>({ required: true })

defineSlots<{
  /** Содержимое панели. Без слота рендерится только ряд вкладок (панель — где-то ещё на экране). */
  default?(props: { value: T }): unknown
}>()

function onUpdate(value: unknown): void {
  const item = findOption(props.items, value)
  if (item) model.value = item.value
}
</script>

<template>
  <TabsRoot class="mv-tabs" :model-value="model" @update:model-value="onUpdate">
    <TabsList class="mv-tabs__list" :aria-label="label">
      <TabsTrigger
        v-for="item in items"
        :key="item.value"
        class="mv-tabs__trigger"
        :value="item.value"
        :disabled="item.disabled"
      >
        {{ item.label }}
        <span v-if="item.count !== undefined" class="mv-tabs__count">{{ item.count }}</span>
      </TabsTrigger>
    </TabsList>
    <TabsContent v-if="$slots.default" class="mv-tabs__panel" :value="model">
      <slot :value="model" />
    </TabsContent>
  </TabsRoot>
</template>

<style scoped>
.mv-tabs__list {
  display: flex;
  gap: var(--space-1);
  overflow-x: auto;
  border-bottom: 1px solid var(--color-border);
  scrollbar-width: none;
}

.mv-tabs__trigger {
  position: relative;
  flex: none;
  height: 40px;
  padding: 0 var(--space-3);
  border: 0;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  background: transparent;
  color: var(--color-text-muted);
  font: var(--font-body-strong);
  cursor: pointer;
  transition:
    color var(--duration-fast) var(--ease-standard),
    background-color var(--duration-fast) var(--ease-standard);
}

/* Линия выбранной вкладки вырастает из центра (дизайн-система, Tabs). */
.mv-tabs__trigger::after {
  content: '';
  position: absolute;
  right: var(--space-3);
  bottom: -1px;
  left: var(--space-3);
  height: 2px;
  border-radius: 2px 2px 0 0;
  background: var(--color-text);
  transform: scaleX(0);
  transition: transform var(--duration-base) var(--ease-standard);
}

.mv-tabs__trigger:hover:not([data-disabled]) {
  background: var(--color-surface-hover);
  color: var(--color-text);
}

.mv-tabs__trigger:focus-visible {
  outline-offset: -2px;
}

.mv-tabs__trigger[data-state='active'] {
  color: var(--color-text);
}

.mv-tabs__trigger[data-state='active']::after {
  transform: scaleX(1);
}

.mv-tabs__trigger[data-disabled] {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

.mv-tabs__count {
  margin-left: 6px;
  color: var(--color-text-muted);
  font: var(--font-caption);
  font-variant-numeric: tabular-nums;
}

.mv-tabs__panel:focus-visible {
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .mv-tabs__trigger::after {
    transition: none;
  }
}
</style>
