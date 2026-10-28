<script setup lang="ts">
/** Витрина слоёв: диалог, подтверждение с загрузкой, drawer, меню действий, тултип на тексте. */
import { useTimeoutFn } from '@vueuse/core'
import { ref } from 'vue'
import IconCopy from '~icons/lucide/copy'
import IconEllipsis from '~icons/lucide/ellipsis'
import IconPencil from '~icons/lucide/pencil'
import IconTrash from '~icons/lucide/trash-2'

import {
  AppButton,
  AppConfirm,
  AppDialog,
  AppDrawer,
  AppDropdownMenu,
  AppIconButton,
  AppInput,
  AppMenuItem,
  AppMenuLabel,
  AppMenuSeparator,
  AppTooltip,
} from '@/shared/ui'

import DevSection from '../DevSection.vue'

/** Сколько длится имитация удаления — чтобы увидеть загрузку в подтверждении. */
const FAKE_DELETE_MS = 1000

const dialogOpen = ref(false)
const drawerOpen = ref(false)
const confirmOpen = ref(false)
const deleting = ref(false)
const lastAction = ref('—')

// Подтверждение закрывает вызывающий, когда действие удалось (контракт AppConfirm).
const fakeDelete = useTimeoutFn(
  () => {
    deleting.value = false
    confirmOpen.value = false
    lastAction.value = 'удалено'
  },
  FAKE_DELETE_MS,
  { immediate: false },
)

function onConfirmDelete(): void {
  deleting.value = true
  fakeDelete.start()
}
</script>

<template>
  <DevSection id="overlays" title="Слои: диалог, подтверждение, drawer, меню, тултип">
    <div class="mv-dev-section__row">
      <AppButton @click="dialogOpen = true">Открыть диалог</AppButton>
      <AppButton @click="confirmOpen = true">Подтверждение</AppButton>
      <AppButton @click="drawerOpen = true">Открыть drawer</AppButton>

      <AppDropdownMenu>
        <template #trigger>
          <AppIconButton label="Действия"><IconEllipsis /></AppIconButton>
        </template>
        <AppMenuLabel>Задача</AppMenuLabel>
        <AppMenuItem kbd="E" @select="lastAction = 'изменить'">
          <template #icon><IconPencil /></template>
          Изменить
        </AppMenuItem>
        <AppMenuItem @select="lastAction = 'дублировать'">
          <template #icon><IconCopy /></template>
          Дублировать
        </AppMenuItem>
        <AppMenuItem disabled>Перенести</AppMenuItem>
        <AppMenuSeparator />
        <AppMenuItem danger @select="confirmOpen = true">
          <template #icon><IconTrash /></template>
          Удалить
        </AppMenuItem>
      </AppDropdownMenu>

      <AppTooltip text="Баллы за выполненные задачи">
        <span class="mv-overlays-section__hint" tabindex="0">Что такое баллы?</span>
      </AppTooltip>

      <span class="mv-dev-section__caption">Последнее действие: {{ lastAction }}</span>
    </div>

    <AppDialog
      v-model:open="dialogOpen"
      title="Новая цель"
      description="Цель — то, к чему вы идёте."
    >
      <AppInput label="Название" placeholder="Пробежать полумарафон" autofocus />
      <template #footer>
        <AppButton @click="dialogOpen = false">Отмена</AppButton>
        <AppButton variant="primary" @click="dialogOpen = false">Создать цель</AppButton>
      </template>
    </AppDialog>

    <AppConfirm
      v-model:open="confirmOpen"
      title="Удалить цель «Полумарафон»?"
      text="Удалятся 3 проекта и 24 задачи. Начисленные баллы останутся."
      confirm-label="Удалить"
      :loading="deleting"
      @confirm="onConfirmDelete"
    />

    <AppDrawer v-model:open="drawerOpen" title="Фильтры">
      <p v-for="n in 12" :key="n">Строка содержимого {{ n }}</p>
      <template #footer>
        <AppButton @click="drawerOpen = false">Сбросить</AppButton>
        <AppButton variant="primary" @click="drawerOpen = false">Показать</AppButton>
      </template>
    </AppDrawer>
  </DevSection>
</template>

<style scoped>
.mv-overlays-section__hint {
  border-bottom: 1px dashed var(--color-text-muted);
  cursor: help;
}
</style>
