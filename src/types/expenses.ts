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
  id?: number
  category_id: number
  sub_category_id?: number
  tags?: string
  payment_method_id: number
  price: string
  date: string
  created_at?: string
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