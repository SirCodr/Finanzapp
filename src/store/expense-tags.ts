import { create } from 'zustand'
import { Expense } from '../types/expenses'
import { devtools } from 'zustand/middleware'

interface ExpenseTags {
  tags: Expense[]
  addTags: (expense: Expense) => void
}

const useExpenseTagsStore = create<ExpenseTags>()(
  devtools(
    (set) => ({
  tags: [],
  addTags: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
})
  )
)

export default useExpenseTagsStore