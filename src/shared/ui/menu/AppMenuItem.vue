<script setup lang="ts">
/**
 * Пункт AppDropdownMenu — элемент блока `mv-dropdown-menu` (CONVENTIONS, 6.2).
 * После выбора меню закрывается само и возвращает фокус на триггер (Reka).
 * Опасный пункт (`danger`) — всегда последним, после AppMenuSeparator, и ведёт к AppConfirm.
 */
import { DropdownMenuItem } from 'reka-ui'

withDefaults(
  defineProps<{
    /** Необратимое действие: красный текст и иконка. */
    danger?: boolean
    disabled?: boolean
    /** Подсказка клавиши справа: «E». Только на устройствах с указателем. */
    kbd?: string
  }>(),
  { kbd: undefined },
)

const emit = defineEmits<{
  /** Пункт выбран — мышью, Enter или пробелом. */
  select: []
}>()

defineSlots<{
  /** Текст пункта: глагол, «Изменить». */
  default(): unknown
  /** Иконка слева. */
  icon?(): unknown
}>()
</script>

<template>
  <DropdownMenuItem
    class="mv-dropdown-menu__item"
    :class="{ 'mv-dropdown-menu__item--danger': danger }"
    :disabled
    @select="emit('select')"
  >
    <slot name="icon" />
    <span class="mv-dropdown-menu__label"><slot /></span>
    <kbd v-if="kbd" class="mv-dropdown-menu__kbd">{{ kbd }}</kbd>
  </DropdownMenuItem>
</template>

<style scoped>
@import '@/shared/styles/media.css';

.mv-dropdown-menu__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  height: 36px;
  padding: 0 10px;
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font: var(--font-body);
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: background-color var(--duration-fast) var(--ease-standard);
}

.mv-dropdown-menu__item :deep(.mv-icon) {
  color: var(--color-text-muted);
}

.mv-dropdown-menu__item[data-highlighted] {
  background: var(--color-surface-hover);
}

.mv-dropdown-menu__item[data-disabled] {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

.mv-dropdown-menu__item--danger,
.mv-dropdown-menu__item--danger :deep(.mv-icon) {
  color: var(--color-danger);
}

.mv-dropdown-menu__label {
  flex: 1;
}

.mv-dropdown-menu__kbd {
  color: var(--color-text-muted);
  font: var(--font-caption);
}

@media (hover: none) {
  .mv-dropdown-menu__kbd {
    display: none;
  }
}

/* Мобильный: пункт — полноценная зона касания. */
@media (--mv-mobile) {
  .mv-dropdown-menu__item {
    height: var(--touch-target);
  }
}
</style>
