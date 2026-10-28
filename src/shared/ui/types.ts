/** Вариант выбора: пункт AppSelect или AppSegmented. */
export interface ChoiceOption<T extends string = string> {
  /** Значение для v-model. Строка, а не число: значения приходят из URL и API строками. */
  value: T
  /** Текст для пользователя. */
  label: string
  /** Вариант виден, но выбрать его нельзя — например, функция ещё недоступна. */
  disabled?: boolean
}

/** Вкладка AppTabs. */
export interface TabItem<T extends string = string> extends ChoiceOption<T> {
  /** Счётчик справа от подписи («Активные 12»): помогает решить, стоит ли переключаться. */
  count?: number
}

/**
 * Вес действия кнопки. `primary` — одно главное действие на экран; `danger` — только внутри
 * подтверждения необратимого действия (дизайн-система, Button).
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

/** `md` — 40px (44px на мобильном), `sm` — 32px для плотных панелей и карточек. */
export type ControlSize = 'md' | 'sm'

/** Сторона от триггера, где появляется тултип. Reka перевернёт её, если места не хватит. */
export type TooltipSide = 'top' | 'bottom' | 'left' | 'right'

/** Смысловой тон бейджа. Цвет никогда не единственный носитель смысла — рядом иконка или слово. */
export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger'
