import type { ChoiceOption } from '../types'

/**
 * Находит вариант по значению, которое вернул примитив Reka UI.
 *
 * Зачем: Reka типизирует значения широко (`string | number | null | …`), а наши компоненты —
 * точным союзом (`'day' | 'week'`). Вместо приведения типа `as T` значение сверяется со списком:
 * если пришло то, чего в списке нет, модель не меняется, и неверное значение не просочится дальше.
 * Отключённый вариант выбрать нельзя — даже если примитив его прислал.
 */
export function findOption<T extends string, O extends ChoiceOption<T>>(
  options: readonly O[],
  value: unknown,
): O | undefined {
  return options.find((option) => option.value === value && !option.disabled)
}
