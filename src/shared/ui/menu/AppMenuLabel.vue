<script setup lang="ts">
/** Подпись группы пунктов AppDropdownMenu: к какому объекту относятся действия. Не выбирается. */
import { DropdownMenuLabel } from 'reka-ui'

defineSlots<{
  /** Текст подписи. */
  default(): unknown
}>()
</script>

<template>
  <DropdownMenuLabel class="mv-dropdown-menu__group-label"><slot /></DropdownMenuLabel>
</template>

<style scoped>
.mv-dropdown-menu__group-label {
  padding: 8px 10px 4px;
  color: var(--color-text-muted);
  font: var(--font-caption);
}
</style>
