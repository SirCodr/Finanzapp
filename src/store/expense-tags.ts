import { create } from 'zustand'
import { LocalExpense } from '../types/expenses'
import { devtools } from 'zustand/middleware'

interface ExpenseTags {
  tags: LocalExpense[]
  addTags: (expense: LocalExpense) => void
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