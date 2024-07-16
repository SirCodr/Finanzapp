import { ServerExpense } from "../types/expenses";
import { getCurrentIsoDate } from "../utils/date";

export const DEFAULT_SERVER_EXPENSE: ServerExpense = {
  category_id: null,
  date: getCurrentIsoDate(),
  payment_method_id: 0,
  price: '',
  description: '',
  sub_category_id: null,
  tags: []
}