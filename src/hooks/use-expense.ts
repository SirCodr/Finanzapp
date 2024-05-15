import { useState } from "react"
import { Expense } from "../types/expenses"
import { getCurrentDate } from "../utils/date"
import { fetchAllExpenses } from "../services/expenses"
import useExpensesStore from "../store/expenses"
import { useQuery } from "react-query"
import { httpResponse } from "../types/http"
import { snakeArrayToCamel } from "../utils"

const DEFAULT_EXPENSE_STATE: Expense = {
  category: '',
  subCategory: '',
  description: '',
  paymentMethod: '',
  tags: [],
  date: getCurrentDate(),
  price: ''
}

const useExpense = () => {
  const [expense, setExpense] = useState<Expense>(DEFAULT_EXPENSE_STATE)
  const { expenses } = useExpensesStore()
  const [ setExpenses ]  = useExpensesStore(state => [state.setExpenses])
  const query = useQuery({
    queryKey: ['expenses'],
    queryFn: fetchAllExpenses,
    enabled: false,
    onSuccess: (data: httpResponse<Expense[]>) => {
      if (data) {
        //TODO: Fix types
        const formattedData = snakeArrayToCamel(data.data)
        setExpenses(formattedData)
      }
    }
  })

  function isQueryLoading() {
    return query.isLoading
  }

  function getAllExpenses() {
    query.refetch()
  }

  function setPropValue<K extends keyof Expense> (prop: K, value: Expense[K]) {
    setExpense({
      ...expense,
      [prop]: value
    })
  }

  return (
    {
      expense,
      expenses,
      isQueryLoading,
      getAllExpenses,
      setPropValue
    }
  )
}

export default useExpense