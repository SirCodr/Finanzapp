export interface Expense {
  category: string
  subCategory: string
  tags: string[]
  description: string
  paymentMethod: string
  price: string
  date: string
}

export interface ExpensesTableColumn {
  column: keyof Expense
  text?: string
}