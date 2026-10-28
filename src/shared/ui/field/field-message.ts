/** Строка под полем: подсказка или ошибка. */
export interface FieldMessage {
  /** Ошибка красится в `--color-danger` и получает иконку; подсказка — приглушённая. */
  kind: 'error' | 'hint'
  text: string
}

/**
 * Выбирает, что показать под полем.
 *
 * Почему одна строка, а не обе: дизайн-система отводит под полем одну строку — ошибка заменяет
 * подсказку, чтобы форма не прыгала по высоте. Пустая строка ошибки считается отсутствием ошибки:
 * библиотеки форм часто отдают `''`, когда поле валидно.
 *
 * @returns `null` — под полем ничего нет, и `aria-describedby` не нужен.
 */
export function resolveFieldMessage(error?: string, hint?: string): FieldMessage | null {
  if (error) return { kind: 'error', text: error }
  if (hint) return { kind: 'hint', text: hint }
  return null
}
