<script setup lang="ts">
/**
 * Выезжающая панель: редактирование задачи, фильтры, меню «Ещё».
 * До 1024px — снизу с ручкой, свайп вниз закрывает; шире — справа на всю высоту, свайп вправо.
 *
 * Reka Drawer даёт фокус-ловушку, блокировку прокрутки и свайп с инерцией (ADR 0010). Во время
 * свайпа он выставляет `--drawer-swipe-movement-x/y` и `data-swiping` — по ним панель едет за пальцем.
 * Пока `dismissible = false`, закрыть нельзя ничем, включая свайп.
 */
import { useMediaQuery } from '@vueuse/core'
import {
  DrawerClose,
  DrawerContent,
  DrawerHandle,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle,
} from 'reka-ui'
import IconX from '~icons/lucide/x'

import { MediaQuery } from '@/shared/config'

import AppIconButton from '../button/AppIconButton.vue'
import { shouldApplyOpenChange } from '../lib/dismiss'

const props = withDefaults(
  defineProps<{
    /** Заголовок — обязателен: по нему скринридер называет панель. */
    title: string
    /** `false` — нельзя закрыть Esc, кликом мимо, свайпом и крестиком. */
    dismissible?: boolean
  }>(),
  { dismissible: true },
)

const open = defineModel<boolean>('open', { required: true })

defineSlots<{
  /** Содержимое; прокручивается, если не помещается. */
  default?(): unknown
  /** Кнопки действий; прилипают к низу панели. */
  footer?(): unknown
}>()

const isDesktop = useMediaQuery(MediaQuery.DesktopUp)

function onOpenChange(next: boolean): void {
  if (shouldApplyOpenChange(next, props.dismissible)) open.value = next
}
</script>

<template>
  <DrawerRoot :open :swipe-direction="isDesktop ? 'right' : 'down'" @update:open="onOpenChange">
    <DrawerPortal>
      <DrawerOverlay class="mv-drawer__overlay" />
      <DrawerContent class="mv-drawer" :aria-describedby="undefined">
        <DrawerHandle v-if="!isDesktop" class="mv-drawer__handle" />
        <header class="mv-drawer__head">
          <DrawerTitle class="mv-drawer__title">{{ title }}</DrawerTitle>
          <DrawerClose v-if="dismissible" as-child>
            <AppIconButton label="Закрыть" :tooltip="false"><IconX /></AppIconButton>
          </DrawerClose>
        </header>
        <div class="mv-drawer__body"><slot /></div>
        <footer v-if="$slots.footer" class="mv-drawer__foot"><slot name="footer" /></footer>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>

<style scoped>
@import '@/shared/styles/media.css';

.mv-drawer__overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  background: var(--color-overlay);
  backdrop-filter: blur(var(--blur-overlay));
}

.mv-drawer__overlay[data-state='open'] {
  animation: mv-drawer-fade-in var(--duration-slow) var(--ease-enter);
}

.mv-drawer__overlay[data-state='closed'] {
  animation: mv-drawer-fade-out var(--duration-base) var(--ease-exit);
}

.mv-drawer {
  --mv-drawer-hidden: translateY(100%);

  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-modal);
  display: flex;
  flex-direction: column;
  max-height: 88%;
  padding-bottom: env(safe-area-inset-bottom);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  background: var(--color-surface-raised);
  box-shadow: var(--shadow-3);
  color: var(--color-text);
  transform: translateY(var(--drawer-swipe-movement-y, 0px));
  transition: transform var(--duration-base) var(--ease-standard);
}

.mv-drawer:focus {
  outline: none;
}

/* Во время свайпа панель следует за пальцем без задержки. */
.mv-drawer[data-swiping] {
  transition: none;
}

.mv-drawer[data-state='open'] {
  animation: mv-drawer-enter var(--duration-slow) var(--ease-enter);
}

.mv-drawer[data-state='closed'] {
  animation: mv-drawer-exit var(--duration-base) var(--ease-exit) forwards;
}

.mv-drawer__handle {
  flex: none;
  width: 36px;
  height: 4px;
  margin: 8px auto 0;
  border-radius: var(--radius-full);
  background: var(--color-border-strong);
  opacity: 0.5;
}

.mv-drawer__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-5) 0;
}

.mv-drawer__title {
  font: var(--font-h2);
  letter-spacing: var(--tracking-h2);
}

.mv-drawer__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-4) var(--space-5);
  overflow-y: auto;
}

.mv-drawer__foot {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5) var(--space-5);
}

.mv-drawer__foot > :deep(*) {
  flex: 1;
}

@keyframes mv-drawer-enter {
  from {
    transform: var(--mv-drawer-hidden);
  }
}

@keyframes mv-drawer-exit {
  to {
    transform: var(--mv-drawer-hidden);
  }
}

@keyframes mv-drawer-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes mv-drawer-fade-out {
  to {
    opacity: 0;
  }
}

@media (--mv-desktop-up) {
  .mv-drawer {
    --mv-drawer-hidden: translateX(100%);

    top: 0;
    left: auto;
    width: 420px;
    max-height: none;
    border-radius: var(--radius-xl) 0 0 var(--radius-xl);
    transform: translateX(var(--drawer-swipe-movement-x, 0px));
  }

  .mv-drawer__head {
    padding-top: var(--space-5);
  }
}

/* Без сдвига — только затухание. */
@media (prefers-reduced-motion: reduce) {
  .mv-drawer[data-state='open'] {
    animation-name: mv-drawer-fade-in;
  }

  .mv-drawer[data-state='closed'] {
    animation-name: mv-drawer-fade-out;
  }
}
</style>
