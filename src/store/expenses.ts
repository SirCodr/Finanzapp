import { create } from 'zustand'
import { Expense } from '../types/expenses'
import expenseItems from '../mock-data/expenses.json'
import { devtools } from 'zustand/middleware'

interface ExpensesState {
  expenses: Expense[]
  setExpenses: (expenses: Expense[]) => void,
  addExpense: (expense: Expense) => void
}

const useExpensesStore = create<ExpensesState>()(
  devtools(
    (set) => ({
  expenses: expenseItems,
  setExpenses: (expenses) => set(() => ({ expenses })),
  addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
})
  )
)

export default useExpensesStore