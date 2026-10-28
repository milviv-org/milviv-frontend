<script setup lang="ts">
/**
 * Индикатор неопределённого ожидания: сохранение, отправка, подгрузка в конце списка.
 * Для загрузки списков и карточек — AppSkeleton: он сохраняет раскладку.
 */
withDefaults(
  defineProps<{
    /** `sm` 16px — в маленьких кнопках и полях; `md` 20px; `lg` 32px — экран целиком. */
    size?: 'sm' | 'md' | 'lg'
    /**
     * Текст для скринридера. С ним спиннер — самостоятельный индикатор (`role="status"`).
     * Без него — декор: внутри кнопки ожидание сообщает `aria-busy` самой кнопки.
     */
    label?: string
  }>(),
  { size: 'md', label: undefined },
)
</script>

<template>
  <svg
    class="mv-spinner"
    :class="`mv-spinner--size-${size}`"
    viewBox="0 0 24 24"
    :role="label ? 'status' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  >
    <circle class="mv-spinner__track" cx="12" cy="12" r="9" />
    <circle class="mv-spinner__arc" cx="12" cy="12" r="9" stroke-dasharray="15 100" />
  </svg>
</template>

<style scoped>
.mv-spinner {
  width: 20px;
  height: 20px;
  flex: none;
  animation: mv-spinner-rotate 0.8s linear infinite;
}

.mv-spinner--size-sm {
  width: 16px;
  height: 16px;
}

.mv-spinner--size-lg {
  width: 32px;
  height: 32px;
}

.mv-spinner__track,
.mv-spinner__arc {
  fill: none;
  stroke: currentColor;
  stroke-width: 2.5;
  stroke-linecap: round;
}

.mv-spinner__track {
  opacity: 0.2;
}

@keyframes mv-spinner-rotate {
  to {
    transform: rotate(360deg);
  }
}

/* Вращение замедляется, но не останавливается: это сигнал, что работа идёт. */
@media (prefers-reduced-motion: reduce) {
  .mv-spinner {
    animation-duration: 1.6s;
  }
}
</style>
