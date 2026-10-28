<script setup lang="ts">
/**
 * Модальное окно для коротких форм и решений. Длинные формы на мобильном — AppDrawer.
 *
 * Reka Dialog запирает фокус, возвращает его на триггер, блокирует прокрутку и закрывается по Esc
 * и клику мимо (ADR 0010). Начальный фокус — элемент с `autofocus`, иначе первый фокусируемый.
 * Пока `dismissible = false`, любые попытки закрытия отклоняются (`shouldApplyOpenChange`).
 */
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import IconX from '~icons/lucide/x'

import AppIconButton from '../button/AppIconButton.vue'
import { shouldApplyOpenChange } from '../lib/dismiss'

const props = withDefaults(
  defineProps<{
    /** Заголовок — обязателен: по нему скринридер называет окно. */
    title: string
    /** Пояснение под заголовком; читается скринридером при открытии. */
    description?: string
    /** `sm` (400px) — подтверждения и короткие вопросы; `md` (480px) — формы. */
    size?: 'md' | 'sm'
    /** `false` — нельзя закрыть Esc, кликом мимо и крестиком: например, пока идёт сохранение. */
    dismissible?: boolean
    /** Крестик в заголовке. Скрывается и при `dismissible = false`. */
    closeButton?: boolean
  }>(),
  { description: undefined, size: 'md', dismissible: true, closeButton: true },
)

const open = defineModel<boolean>('open', { required: true })

defineSlots<{
  /** Содержимое: поля формы, текст. */
  default?(): unknown
  /** Кнопки действий: сначала второстепенная, затем главная. */
  footer?(): unknown
}>()

function onOpenChange(next: boolean): void {
  if (shouldApplyOpenChange(next, props.dismissible)) open.value = next
}
</script>

<template>
  <DialogRoot :open @update:open="onOpenChange">
    <DialogPortal>
      <DialogOverlay class="mv-dialog__overlay" />
      <!-- Без описания явно убираем aria-describedby, иначе Reka предупреждает о его отсутствии. -->
      <DialogContent
        class="mv-dialog"
        :class="`mv-dialog--size-${size}`"
        v-bind="description ? {} : { 'aria-describedby': undefined }"
      >
        <header class="mv-dialog__head">
          <div class="mv-dialog__head-row">
            <DialogTitle class="mv-dialog__title">{{ title }}</DialogTitle>
            <DialogClose v-if="closeButton && dismissible" as-child>
              <AppIconButton class="mv-dialog__close" label="Закрыть" :tooltip="false">
                <IconX />
              </AppIconButton>
            </DialogClose>
          </div>
        </header>
        <div class="mv-dialog__body">
          <DialogDescription v-if="description" class="mv-dialog__description">
            {{ description }}
          </DialogDescription>
          <slot />
        </div>
        <footer v-if="$slots.footer" class="mv-dialog__foot"><slot name="footer" /></footer>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped src="./dialog.css"></style>
