/**
 * Флаги функций, которые ждут доработки бэкенда (docs/BACKEND-REQUESTS.md).
 * Код готов заранее; функция включается здесь, когда бэкенд её поддержит.
 */
export const features = {
  /** Поиск по задачам — параметр `q` в `GET /tasks` (п. 3). */
  taskSearch: false,
} as const
