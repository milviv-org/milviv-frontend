<script setup lang="ts">
/** Витрина полей: подписи, подсказки, ошибки, иконки, загрузка, select и textarea. */
import { ref } from 'vue'
import IconSearch from '~icons/lucide/search'

import { AppInput, AppSelect, AppTextarea, type ChoiceOption } from '@/shared/ui'

import DevSection from '../DevSection.vue'

type Repeat = 'none' | 'daily' | 'weekly' | 'monthly'

const REPEAT_OPTIONS: readonly ChoiceOption<Repeat>[] = [
  { value: 'none', label: 'Не повторять' },
  { value: 'daily', label: 'Каждый день' },
  { value: 'weekly', label: 'Каждую неделю' },
  { value: 'monthly', label: 'Каждый месяц', disabled: true },
]

const title = ref('')
const search = ref('')
const description = ref('')
const repeat = ref<Repeat | null>(null)
</script>

<template>
  <DevSection id="fields" title="Поля">
    <div class="mv-dev-section__grid">
      <AppInput
        v-model="title"
        label="Название задачи"
        placeholder="Например, утренняя пробежка"
        hint="До 200 символов"
        autocomplete="off"
      />
      <AppInput
        model-value="Пробежка"
        label="С ошибкой"
        error="Такое название уже есть в проекте"
      />
      <AppInput model-value="Нельзя изменить" label="Отключено" disabled />
      <AppInput v-model="search" label="Поиск" type="search" placeholder="Найти задачу">
        <template #lead><IconSearch /></template>
      </AppInput>
      <AppInput model-value="Проверяем…" label="Загрузка" loading />
      <AppInput model-value="" label="Маленькое" size="sm" placeholder="sm" optional />
      <AppSelect
        v-model="repeat"
        :options="REPEAT_OPTIONS"
        label="Повтор"
        placeholder="Выберите повтор"
      />
      <AppSelect
        :model-value="null"
        :options="REPEAT_OPTIONS"
        label="Повтор с ошибкой"
        placeholder="Выберите повтор"
        error="Выберите, как повторять план"
      />
      <AppTextarea
        v-model="description"
        label="Описание"
        optional
        placeholder="Что нужно сделать"
      />
    </div>
    <p class="mv-dev-section__caption">
      Значения: «{{ title }}», «{{ search }}», повтор = {{ repeat ?? 'null' }}, описание
      {{ description.length }} симв.
    </p>
  </DevSection>
</template>
