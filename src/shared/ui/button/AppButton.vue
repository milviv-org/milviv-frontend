<script setup lang="ts">
/**
 * Кнопка — единственный способ запустить действие. Вариант задаёт вес действия, а не украшение.
 * С `to` рендерится ссылкой того же вида: переход остаётся ссылкой (открыть в новой вкладке, SEO).
 *
 * Почему загрузка не отключает кнопку: `disabled` сбросил бы фокус, и пользователь клавиатуры
 * потерял бы место. Вместо этого `aria-busy` и игнорирование повторных нажатий.
 */
import { RouterLink, type RouteLocationRaw } from 'vue-router'

import AppSpinner from '../spinner/AppSpinner.vue'
import type { ButtonVariant, ControlSize } from '../types'

const props = withDefaults(
  defineProps<{
    /** Вес действия; по умолчанию `secondary` — главное действие нужно выбрать осознанно. */
    variant?: ButtonVariant
    size?: ControlSize
    /** Тип нативной кнопки. По умолчанию `button`: случайный `submit` внутри формы отправил бы её. */
    type?: 'button' | 'submit' | 'reset'
    /** Маршрут — кнопка становится ссылкой. */
    to?: RouteLocationRaw
    /** Действие выполняется: спиннер на месте текста, ширина сохраняется, повторный клик игнорируется. */
    loading?: boolean
    disabled?: boolean
    /** Во всю ширину контейнера — главная кнопка мобильной формы. */
    block?: boolean
    /** Квадрат под одну иконку. Напрямую не используется — для этого AppIconButton с подписью. */
    square?: boolean
  }>(),
  { variant: 'secondary', size: 'md', type: 'button', to: undefined },
)

const emit = defineEmits<{
  /** Нажатие. Не приходит во время `loading`. */
  click: [event: MouseEvent]
}>()

function onClick(event: MouseEvent): void {
  if (props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to
    :type="to ? undefined : type"
    :disabled="to ? undefined : disabled"
    :aria-busy="loading || undefined"
    class="mv-button"
    :class="[
      `mv-button--${variant}`,
      `mv-button--size-${size}`,
      { 'mv-button--block': block, 'mv-button--square': square },
    ]"
    @click="onClick"
  >
    <AppSpinner v-if="loading" class="mv-button__spinner" :size="size === 'sm' ? 'sm' : 'md'" />
    <span class="mv-button__content"><slot /></span>
  </component>
</template>

<style scoped>
@import '@/shared/styles/media.css';

.mv-button {
  --mv-button-height: var(--control-md);
  --mv-icon-size: 20px;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--mv-button-height);
  min-width: var(--mv-button-height);
  padding: 0 var(--space-4);
  border: 0;
  border-radius: var(--radius-md);
  font: var(--font-body-strong);
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition:
    background-color var(--duration-fast) var(--ease-standard),
    color var(--duration-fast) var(--ease-standard),
    transform var(--duration-fast) var(--ease-standard);
}

.mv-button__content {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.mv-button--size-sm {
  --mv-button-height: var(--control-sm);
  --mv-icon-size: 16px;

  padding: 0 var(--space-3);
  border-radius: var(--radius-sm);
  font: var(--font-label);
}

.mv-button--size-sm .mv-button__content {
  gap: 6px;
}

.mv-button--square {
  width: var(--mv-button-height);
  padding: 0;
}

.mv-button--block {
  width: 100%;
}

.mv-button--primary {
  background: var(--color-accent);
  color: var(--color-accent-contrast);
}

.mv-button--primary:hover:not(:disabled) {
  background: var(--color-accent-hover);
}

.mv-button--secondary {
  background: var(--color-surface-hover);
  color: var(--color-text);
}

.mv-button--secondary:hover:not(:disabled) {
  background: var(--color-surface-active);
}

.mv-button--ghost {
  background: transparent;
  color: var(--color-text);
}

.mv-button--ghost:hover:not(:disabled),
.mv-button--ghost[data-state='open'] {
  background: var(--color-surface-hover);
}

.mv-button--ghost:active:not(:disabled) {
  background: var(--color-surface-active);
}

.mv-button--danger {
  background: var(--color-danger);
  color: var(--color-danger-contrast);
}

.mv-button--danger:hover:not(:disabled) {
  background: var(--color-danger-hover);
}

.mv-button:active:not(:disabled, [aria-busy='true']) {
  transform: scale(0.97);
}

.mv-button:disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

/* Содержимое скрыто, но держит ширину — кнопка не прыгает. */
.mv-button[aria-busy='true'] {
  cursor: progress;
}

.mv-button[aria-busy='true'] .mv-button__content {
  visibility: hidden;
}

.mv-button__spinner {
  position: absolute;
  inset: 0;
  margin: auto;
}

/* Мобильный: зона нажатия 44px. */
@media (--mv-mobile) {
  .mv-button--size-md {
    --mv-button-height: var(--touch-target);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mv-button:active:not(:disabled, [aria-busy='true']) {
    transform: none;
  }
}
</style>
