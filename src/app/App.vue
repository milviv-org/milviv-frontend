<script setup lang="ts">
import { RouterView } from 'vue-router'

import { AppUiProvider } from '@/shared/ui'
</script>

<template>
  <AppUiProvider>
    <RouterView />
  </AppUiProvider>
</template>
