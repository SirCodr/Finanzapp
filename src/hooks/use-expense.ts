import { useMemo, useState } from "react"
import { Expense, ServerExpense, ServerExpenseCategory, ServerExpenseSubCategory } from "../types/expenses"
import { getCurrentDate } from "../utils/date"
import { fetchAllExpenses, postExpenses } from "../services/expenses"
import useExpensesStore from "../store/expenses"
import { useMutation, useQuery } from "react-query"
import { httpResponse } from "../types/http"
import { isExpense, snakeArrayToCamel } from "../utils"
import { fetchAllExpenseCategories, postExpenseCategories } from "../services/expenses/categories"
import { fetchAllExpenseSubCategories } from "../services/expenses/sub_categories"
import { fetchAllPaymentMethods, postPaymentMethods } from "../services/payment-methods"
import { toast } from "sonner"
import { ServerPaymentMethod } from "../types/payment-methods"

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

  const postMutation = useMutation((expenses: ServerExpense[]) => postExpenses(expenses))

  const expensesQuery = useMemo(() => {
    return {
      isLoading: query.isLoading,
      refetch: () => query.refetch()
    }
  }, [query])

  const expensesPostMutation = useMemo(() => {
    return {
      isLoading: postMutation.isLoading,
      isSuccess: postMutation.isSuccess,
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
    const pendingExpenses: Expense[] = []

    const categories = await fetchAllExpenseCategories()
    const subCategories = await fetchAllExpenseSubCategories()
    const paymentMethods = await fetchAllPaymentMethods()

    const pendingCategories: Set<string> =  new Set<string>()
    const pendingSubCategories: Set<string> =  new Set<string>()
    const pendingPaymentMethods: Set<string> =  new Set<string>()

    for (const expense of (data as Expense[])) {
      const formattedExpenseFound = getFormattedExpensesforUpload({
        rawExpense: expense,
        serverCategories: categories.data,
        serverSubcategories: subCategories.data,
        serverPaymentMethods: paymentMethods.data
      })

      if (formattedExpenseFound) {
        expensesDraft.push(formattedExpenseFound)
      }

      if (!categoryMatch && !pendingCategories.has(expense.category)) {
        pendingCategories.add(expense.category)
      }

      if (!paymentMethodMatch && !pendingPaymentMethods.has(expense.paymentMethod)) {
        pendingPaymentMethods.add(expense.paymentMethod)
      }

      if (!categoryMatch?.id || !paymentMethodMatch?.id) {
        pendingExpenses.push(expense)
        continue
      }
    }

    if (pendingCategories.size) {
      const newExpenseCategories = await postExpenseCategories(Array.from(pendingCategories).map(item => ({ name: item })))
      categories.data = [...categories.data, ...newExpenseCategories.data ]
    }

    if (pendingPaymentMethods.size) {
      const newPaymentMethods = await postPaymentMethods(Array.from(pendingPaymentMethods).map(item => ({ name: item })))
      paymentMethods.data = [...paymentMethods.data, ...newPaymentMethods.data ]
    }

    for (const expense of pendingExpenses) {
      const categoryMatch = categories.data.find(category => expense.category.trim().length && category.name === expense.category)
      const subCategoryMatch = subCategories.data.find(subCategory => expense.subCategory.trim().length && subCategory.name === expense.subCategory && categoryMatch?.id === subCategory.category_id)
      const paymentMethodMatch = paymentMethods.data.find(paymentMethod =>paymentMethod.name.trim().length && paymentMethod.name === expense.paymentMethod)

      if (!categoryMatch?.id || !paymentMethodMatch?.id) {
        toast.error('Error')
        continue
      }

      expensesDraft.push({
        date: expense.date,
        category_id: categoryMatch.id,
        sub_category_id: subCategoryMatch?.id || null,
        tags: expense.tags,
        payment_method_id: paymentMethodMatch.id,
        price: expense.price
      })
    }

    return expensesDraft
  }

  function getFormattedExpensesforUpload({
    rawExpense,
    serverCategories,
    serverSubcategories,
    serverPaymentMethods
  }: {
    rawExpense: Expense
    serverCategories: ServerExpenseCategory[]
    serverSubcategories: ServerExpenseSubCategory[]
    serverPaymentMethods: ServerPaymentMethod[]
  }): ServerExpense | null {
    const categoryMatch = serverCategories.find(
      (category) =>
        rawExpense.category.trim().length &&
        category.name === rawExpense.category
    )
    const subCategoryMatch = serverSubcategories.find(
      (subCategory) =>
        rawExpense.subCategory.trim().length &&
        subCategory.name === rawExpense.subCategory &&
        categoryMatch?.id === subCategory.category_id
    )
    const paymentMethodMatch = serverPaymentMethods.find(
      (paymentMethod) =>
        paymentMethod.name.trim().length &&
        paymentMethod.name === rawExpense.paymentMethod
    )

    if (!categoryMatch?.id || !paymentMethodMatch?.id) return null

    return {
      date: expense.date,
      category_id: categoryMatch.id,
      sub_category_id: subCategoryMatch?.id || null,
      tags: expense.tags,
      payment_method_id: paymentMethodMatch.id,
      price: expense.price
    }
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