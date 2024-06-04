import { useMemo, useState } from "react"
import { Expense, ServerExpense } from "../types/expenses"
import { getCurrentDate } from "../utils/date"
import { fetchAllExpenses } from "../services/expenses"
import useExpensesStore from "../store/expenses"
import { useMutation, useQuery } from "react-query"
import { httpResponse } from "../types/http"
import { isExpense, snakeArrayToCamel } from "../utils"
import http from "../http"
import { fetchAllExpenseCategories } from "../services/expenses/categories"
import { fetchAllExpenseSubCategories } from "../services/expenses/sub_categories"
import { fetchAllPaymentMethods } from "../services/payment-methods"

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

  async function formatExpensesForUpload(data: unknown[]) {
    if (!data || !data.length) throw Error('No hay información recibida')

    const firstRow = data[0]

    if (!isExpense(firstRow)) throw Error('Las columnas no están bien nombradas')

    const expensesDraft: ServerExpense[] = []

    const categories = await fetchAllExpenseCategories()
    const subCategories = await fetchAllExpenseSubCategories()
    const paymentMethods = await fetchAllPaymentMethods()

    for (const expense of (data as Expense[])) {
      const categoryMatch = categories.data.find(category => category.name === expense.category)
      const subCategoryMatch = subCategories.data.find(subCategory => subCategory.name === expense.subCategory && categoryMatch?.id === subCategory.category_id)
      const paymentMethodMatch = paymentMethods.data.find(paymentMethod => paymentMethod.name === expense.paymentMethod)

      if (!categoryMatch || !categoryMatch.id) continue

      if (!paymentMethodMatch || !paymentMethodMatch.id) continue

      expensesDraft.push({
        date: expense.date,
        category_id: categoryMatch.id,
        sub_category_id: subCategoryMatch?.id,
        tags: expense.tags,
        payment_method_id: paymentMethodMatch.id,
        price: expense.price
      })
    }

    return expensesDraft
  }

  return (
    {
      expense,
      expenses,
      expensesQuery,
      expensesPostMutation,
      setPropValue,
      formatExpensesForUpload
    }
  )
}

export default useExpense