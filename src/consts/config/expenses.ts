import { ExpensesTableColumn } from "../../types/expenses";

export const RENDER_TABLE_COLUMNS: ExpensesTableColumn[] = [
  {
    column: 'date'
  },
  {
    column: 'category'
  },
  {
    column: 'paymentMethod',
    text: 'Payment Method'
  },
  {
    column: 'price'
  }
]