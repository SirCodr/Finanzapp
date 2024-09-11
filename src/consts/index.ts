import { ServerExpense } from "../types/expenses";
import { ServerIncome } from "../types/income";
import { getCurrentIsoDate } from "../utils/date";

export const DEFAULT_SERVER_EXPENSE: ServerExpense = {
  categoryId: null,
  date: getCurrentIsoDate(),
  paymentMethodId: 0,
  price: '',
  description: '',
  subCategoryId: null,
  tags: []
}

export const DEFAULT_SERVER_INCOME: ServerIncome = {
  categoryId: null,
  date: getCurrentIsoDate(),
  paymentAccountId: 0,
  amount: '',
  description: '',
  subCategoryId: null
}