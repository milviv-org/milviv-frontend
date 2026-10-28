<script setup lang="ts">
/**
 * Подтверждение необратимого действия: удаление цели, проекта, задачи, награды.
 * Для обратимых действий диалог не нужен — toast с «Вернуть».
 *
 * Почему Reka AlertDialog, а не Dialog: роль `alertdialog`, клик мимо не закрывает окно (решение
 * нельзя принять случайно), начальный фокус — на «Отмена».
 * Окно не закрывается само после `confirm`: его закрывает вызывающий, когда действие удалось —
 * иначе при ошибке пользователь потеряет контекст. Пока `loading`, закрыть его нельзя.
 */
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
} from 'reka-ui'
import IconTrash from '~icons/lucide/trash-2'

import AppButton from '../button/AppButton.vue'
import { shouldApplyOpenChange } from '../lib/dismiss'

const props = withDefaults(
  defineProps<{
    /** Вопрос с объектом: «Удалить цель «Полумарафон»?» */
    title: string
    /** Последствия числами: что удалится, что останется. */
    text?: string
    /** Тот же глагол, что в заголовке: «Удалить». Не «Да» и не «ОК». */
    confirmLabel: string
    cancelLabel?: string
    /** Действие выполняется: спиннер на кнопке, закрыть окно нельзя. */
    loading?: boolean
  }>(),
  { text: undefined, cancelLabel: 'Отмена' },
)

const emit = defineEmits<{
  /** Пользователь подтвердил. Выполните действие и закройте окно (`open = false`). */
  confirm: []
}>()

const open = defineModel<boolean>('open', { required: true })

defineSlots<{
  /** Иконка над заголовком. По умолчанию — корзина. */
  icon?(): unknown
}>()

function onOpenChange(next: boolean): void {
  if (shouldApplyOpenChange(next, !props.loading)) open.value = next
}
</script>

<template>
  <AlertDialogRoot :open @update:open="onOpenChange">
    <AlertDialogPortal>
      <AlertDialogOverlay class="mv-dialog__overlay" />
      <AlertDialogContent
        class="mv-dialog mv-dialog--size-sm"
        v-bind="text ? {} : { 'aria-describedby': undefined }"
      >
        <header class="mv-dialog__head">
          <span class="mv-dialog__icon" aria-hidden="true">
            <slot name="icon"><IconTrash /></slot>
          </span>
          <AlertDialogTitle class="mv-dialog__title">{{ title }}</AlertDialogTitle>
        </header>
        <div class="mv-dialog__body">
          <AlertDialogDescription v-if="text" class="mv-dialog__description">
            {{ text }}
          </AlertDialogDescription>
        </div>
        <footer class="mv-dialog__foot">
          <AlertDialogCancel as-child>
            <AppButton :disabled="loading">{{ cancelLabel }}</AppButton>
          </AlertDialogCancel>
          <AppButton variant="danger" :loading @click="emit('confirm')">{{
            confirmLabel
          }}</AppButton>
        </footer>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<style scoped src="./dialog.css"></style>

<style scoped>
.mv-dialog__icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-danger-soft);
  color: var(--color-danger);
}
</style>
