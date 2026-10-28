<script setup lang="ts">
/**
 * Меню действий над объектом (задача, проект, цель, награда), обычно по кнопке «ещё».
 * Триггер — слот `trigger` с одной кнопкой; атрибуты триггера Reka передаёт ей сам (`as-child`).
 *
 * Reka DropdownMenu даёт портал, позицию у триггера с переворотом у края экрана, клавиатуру
 * (стрелки, Home/End, поиск по первой букве), Esc и возврат фокуса (ADR 0010).
 * На мобильном дизайн-система показывает действия в AppDrawer — это решает экран, не меню.
 */
import {
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'reka-ui'

withDefaults(
  defineProps<{
    /** Край триггера, по которому выравнивается меню. `end` — для кнопки «ещё» справа в карточке. */
    align?: 'start' | 'end'
  }>(),
  { align: 'end' },
)

defineSlots<{
  /** Кнопка, открывающая меню. Обычно `AppIconButton` с иконкой ellipsis. */
  trigger(): unknown
  /** Пункты: AppMenuItem, AppMenuSeparator, AppMenuLabel. */
  default(): unknown
}>()
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child><slot name="trigger" /></DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent class="mv-dropdown-menu" :align :side-offset="4" :collision-padding="8">
        <slot />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<style scoped>
.mv-dropdown-menu {
  z-index: var(--z-dropdown);
  min-width: 220px;
  padding: 4px;
  border-radius: var(--radius-lg);
  background: var(--color-surface-raised);
  box-shadow:
    var(--shadow-2),
    0 0 0 1px var(--color-border);
  color: var(--color-text);
  transform-origin: var(--reka-dropdown-menu-content-transform-origin);
}

.mv-dropdown-menu[data-state='open'] {
  animation: mv-dropdown-menu-enter var(--duration-base) var(--ease-enter);
}

.mv-dropdown-menu[data-state='closed'] {
  animation: mv-dropdown-menu-exit var(--duration-fast) var(--ease-exit);
}

@keyframes mv-dropdown-menu-enter {
  from {
    opacity: 0;
    transform: scale(0.97) translateY(-4px);
  }
}

@keyframes mv-dropdown-menu-exit {
  to {
    opacity: 0;
    transform: scale(0.97);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mv-dropdown-menu[data-state='open'] {
    animation-name: mv-dropdown-menu-fade;
  }

  @keyframes mv-dropdown-menu-fade {
    from {
      opacity: 0;
    }
  }
}
</style>
