import { create } from 'zustand'
import { Expense } from '../types/expenses'
import expenseItems from '../mock-data/expenses.json'

interface ExpensesState {
  expenses: Expense[]
  addExpense: (expense: Expense) => void
}

const useExpensesStore = create<ExpensesState>()((set) => ({
  expenses: expenseItems,
  addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
}))

export default useExpensesStore