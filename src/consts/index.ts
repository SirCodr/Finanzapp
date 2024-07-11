import { ServerExpense } from "../types/expenses";
import { getCurrentDate } from "../utils/date";

export const DEFAULT_SERVER_EXPENSE: ServerExpense = {
  category_id: 0,
  date: getCurrentDate(),
  payment_method_id: 0,
  price: '',
  description: '',
  sub_category_id: null,
  tags: []
}