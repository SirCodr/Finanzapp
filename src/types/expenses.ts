export interface LocalExpense {
  category: string
  subCategory: string
  tags: string[]
  description: string
  paymentMethod: string
  price: string
  date: string
}

export interface ServerExpense {
  category_id: number;
  created_at?: string;
  date: string;
  id?: number;
  description: string | null;
  payment_method_id: number;
  price: string;
  sub_category_id: number | null;
  tags: string;
}

export interface ExpensesTableColumn {
  column: keyof LocalExpense
  text?: string
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