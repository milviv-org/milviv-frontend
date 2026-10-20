declare const brand: unique symbol

/**
 * Номинальный тип поверх структурного: `TaskId` и `GoalId` — обе строки,
 * но передать одну вместо другой нельзя.
 *
 * @example type TaskId = Brand<string, 'TaskId'>
 */
export type Brand<T, B extends string> = T & { readonly [brand]: B }
