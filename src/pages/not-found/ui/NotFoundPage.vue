<script setup lang="ts">
/** Ответ на неизвестный адрес: объясняет, что страницы нет, и ведёт на главную. */
import { RouterLink } from 'vue-router'

import { RouteName } from '@/shared/config'
</script>

<template>
  <main>
    <h1>Страница не найдена</h1>
    <RouterLink :to="{ name: RouteName.Home }">На главную</RouterLink>
  </main>
</template>
