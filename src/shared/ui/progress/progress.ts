/**
 * Приводит долю выполнения к диапазону 0…1.
 *
 * Зачем: доля считается из данных сервера (`done / total`), и там бывают `NaN` (0 / 0),
 * отрицательные и больше единицы (задачу вернули в работу после пересчёта). Полоса прогресса
 * не должна вылезать за трек или ломать `transform`.
 *
 * @returns `0` для `NaN` и бесконечностей: «прогресса нет» безопаснее, чем «всё готово».
 */
export function toFraction(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.min(1, Math.max(0, value))
}

/** Процент для `aria-valuenow` и подписи: целое, чтобы скринридер не читал «57,333 процента». */
export function toPercent(fraction: number): number {
  return Math.round(toFraction(fraction) * 100)
}
