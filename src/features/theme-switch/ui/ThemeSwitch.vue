<script setup lang="ts">
/** Переключатель темы для настроек: светлая, тёмная или как в системе. Сохраняется сразу. */
import { storeToRefs } from 'pinia'

import { AppSegmented, type ChoiceOption } from '@/shared/ui'

import type { ThemePreference } from '../model/theme'
import { useThemeStore } from '../model/theme.store'

const OPTIONS: readonly ChoiceOption<ThemePreference>[] = [
  { value: 'light', label: 'Светлая' },
  { value: 'dark', label: 'Тёмная' },
  { value: 'system', label: 'Как в системе' },
]

const { preference } = storeToRefs(useThemeStore())
</script>

<template>
  <AppSegmented v-model="preference" :options="OPTIONS" label="Тема оформления" />
</template>
