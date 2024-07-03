export interface Expense {
  category: string
  subCategory: string
  tags: string
  description: string
  paymentMethod: string
  price: string
  date: string
}

export interface ExpensesTableColumn {
  column: keyof Expense
  text?: string
}

export interface ServerExpense {
  category_id: number;
  created_at?: string;
  date: string;
  id?: number;
  payment_method_id: number;
  price: string;
  sub_category_id: number | null;
  tags: string | null;
}

export interface ServerExpenseCategory {
  id?: number
  name: string
}

export interface ServerExpenseSubCategory {
  id?: number
  name: string
  category_id?: number
}