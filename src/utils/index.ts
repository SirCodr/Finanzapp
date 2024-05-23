/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'

export function generateRandomKey (index: number) {
  return crypto.randomUUID() + index
}
//TODO: Fix types
export function snakeToCamel(obj: any) {
  const data = _.mapKeys(obj, (__, key) => _.camelCase(key));
  return _.toPlainObject(data)
}

// Función genérica para convertir las claves de snake case a camel case en un array de objetos
export function snakeArrayToCamel(array: any[]) {
  return array.map((obj: any) => snakeToCamel(obj));
}

export function isExpense(expense: unknown): expense is Expense {
  return (expense as Expense).price !== undefined;
}