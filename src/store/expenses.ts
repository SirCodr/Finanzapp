import { create } from 'zustand'
import { LocalExpense } from '../types/expenses'
import { devtools } from 'zustand/middleware'

interface ExpensesState {
  expenses: LocalExpense[]
  setExpenses: (expenses: LocalExpense[]) => void,
  addExpense: (expense: LocalExpense) => void
}

const useExpensesStore = create<ExpensesState>()(
  devtools(
    (set) => ({
  expenses: [],
  setExpenses: (expenses) => set(() => ({ expenses })),
  addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
})
  )
)

export default useExpensesStore