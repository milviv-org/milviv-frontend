<script setup lang="ts">
/** Разделитель групп пунктов AppDropdownMenu. Обязателен перед опасным пунктом. */
import { DropdownMenuSeparator } from 'reka-ui'
</script>

<template>
  <DropdownMenuSeparator class="mv-dropdown-menu__separator" />
</template>

<style scoped>
.mv-dropdown-menu__separator {
  height: 1px;
  margin: 4px 6px;
  background: var(--color-border);
}
</style>
