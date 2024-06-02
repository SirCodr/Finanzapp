import { useMemo, useState } from "react"
import { Expense, ServerExpense } from "../types/expenses"
import { getCurrentDate } from "../utils/date"
import { fetchAllExpenses } from "../services/expenses"
import useExpensesStore from "../store/expenses"
import { useMutation, useQuery } from "react-query"
import { httpResponse } from "../types/http"
import { snakeArrayToCamel } from "../utils"
import http from "../http"

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

  const postMutation = useMutation((expenses: ServerExpense[]) => http.post('upload-expenses', expenses))

  const expensesQuery = useMemo(() => {
    return {
      isLoading: query.isLoading,
      refetch: () => query.refetch()
    }
  }, [query])

  const expensesPostMutation = useMemo(() => {
    return {
      isLoading: postMutation.isLoading,
      mutate: (expenses: ServerExpense[]) => postMutation.mutate(expenses)
    }
  }, [postMutation])

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
      expensesQuery,
      expensesPostMutation,
      setPropValue
    }
  )
}

export default useExpense