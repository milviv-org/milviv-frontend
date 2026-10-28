<script setup lang="ts">
/** Витрина кнопок: все варианты, размеры и состояния, icon-кнопки с тултипами, кнопка-ссылка. */
import IconPencil from '~icons/lucide/pencil'
import IconPlus from '~icons/lucide/plus'
import IconTrash from '~icons/lucide/trash-2'

import { RouteName } from '@/shared/config'
import { AppButton, AppIconButton, type ButtonVariant } from '@/shared/ui'

import DevSection from '../DevSection.vue'

const VARIANTS: { variant: ButtonVariant; label: string }[] = [
  { variant: 'primary', label: 'Создать задачу' },
  { variant: 'secondary', label: 'Отложить' },
  { variant: 'ghost', label: 'Подробнее' },
  { variant: 'danger', label: 'Удалить' },
]
</script>

<template>
  <DevSection id="buttons" title="Кнопки">
    <div v-for="item in VARIANTS" :key="item.variant" class="mv-dev-section__row">
      <code class="mv-dev-section__caption mv-buttons-section__name">{{ item.variant }}</code>
      <AppButton :variant="item.variant">{{ item.label }}</AppButton>
      <AppButton :variant="item.variant"><IconPlus />С иконкой</AppButton>
      <AppButton :variant="item.variant" size="sm">Маленькая</AppButton>
      <AppButton :variant="item.variant" loading>Сохранение</AppButton>
      <AppButton :variant="item.variant" disabled>Недоступна</AppButton>
    </div>
    <div class="mv-dev-section__row">
      <code class="mv-dev-section__caption mv-buttons-section__name">icon</code>
      <AppIconButton label="Изменить"><IconPencil /></AppIconButton>
      <AppIconButton label="Удалить" tooltip="bottom"><IconTrash /></AppIconButton>
      <AppIconButton label="Добавить" variant="secondary" size="sm" tooltip="right">
        <IconPlus />
      </AppIconButton>
    </div>
    <div class="mv-dev-section__row">
      <code class="mv-dev-section__caption mv-buttons-section__name">link</code>
      <AppButton :to="{ name: RouteName.Home }" variant="ghost">Ссылка-кнопка</AppButton>
    </div>
    <AppButton variant="primary" block>Во всю ширину</AppButton>
  </DevSection>
</template>

<style scoped>
.mv-buttons-section__name {
  width: 72px;
}
</style>
