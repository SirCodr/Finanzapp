import { useState } from "react"
import { Expense } from "../types/expenses"

const DEFAULT_EXPENSE_STATE: Expense = {
  category: '',
  subCategory: '',
  description: '',
  paymentMethod: '',
  tags: [],
  date: '',
  price: ''
}

const useExpense = () => {
  const [expense, setExpense] = useState<Expense>(DEFAULT_EXPENSE_STATE)

  function setPropValue<K extends keyof Expense> (prop: K, value: Expense[K]) {
    setExpense({
      ...expense,
      [prop]: value
    })
  }

  return (
    {
      expense,
      setPropValue
    }
  )
}

export default useExpense