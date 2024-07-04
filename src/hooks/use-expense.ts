import { useEffect, useState } from "react"
import { LocalExpense, ServerExpense } from "../types/expenses"
import { postExpenses } from "../services/expenses"
import useExpensesStore from "../store/expenses"
import { useMutation, useQuery } from "react-query"
import { httpResponse } from "../types/http"
import { snakeArrayToCamel } from "../utils"
import { fetchAllExpenseCategories, postExpenseCategories } from "../services/expenses/categories"
import { fetchAllExpenseSubCategories } from "../services/expenses/sub_categories"
import { fetchAllPaymentMethods, postPaymentMethods } from "../services/payment-methods"
import { toast } from "sonner"
import { getFormattedExpensesforUpload, isLocalExpense } from "../utils/expenses"
import { getCurrentDate } from "../utils/date"

const DEFAULT_SERVER_EXPENSE: ServerExpense = {
  category_id: 0,
  date: getCurrentDate(),
  payment_method_id: 0,
  price: '',
  description: '',
  sub_category_id: null,
  tags: ""
}

const useExpense = () => {
  const [serverExpense, setServerExpense] = useState<ServerExpense>(DEFAULT_SERVER_EXPENSE)
  const [isLoading, setLoading] = useState(false)
  const { expenses: localExpenses } = useExpensesStore()
  const [ setLocalExpenses ]  = useExpensesStore(state => [state.setExpenses])

  const query = useQuery({
    queryKey: ['expenses'],
    queryFn: fetchAllExpenses,
    enabled: false,
    onSuccess: (data: httpResponse<LocalExpense[]>) => {
      if (data) {
        //TODO: Fix types
        const formattedData = snakeArrayToCamel(data.data)
        setLocalExpenses(formattedData)
      }
    }
  })

  const createMutation = useMutation(async (expenses: ServerExpense[]) => await postExpenses(expenses))

  async function fetchAllExpenses (): Promise<void> {
    await query.refetch()
  }

  function createExpenses (expenses: ServerExpense[]) {
    createMutation.mutate(expenses)
  }

  function setPropValue <K extends keyof ServerExpense> (prop: K, value: ServerExpense[K]) {
    setServerExpense({
      ...serverExpense,
      [prop]: value
    })
  }

  async function formatExpensesForUpload(data: unknown[]) {
    if (!data || !data.length) throw Error('No hay información recibida')

    const firstRow = data[0]

    if (!isLocalExpense(firstRow)) throw Error('Las columnas no están bien nombradas')

    const expensesDraft: ServerExpense[] = []
    const pendingExpenses: LocalExpense[] = []

    const categories = await fetchAllExpenseCategories()
    const subCategories = await fetchAllExpenseSubCategories()
    const paymentMethods = await fetchAllPaymentMethods()

    const pendingCategories: Set<string> =  new Set<string>()
    const pendingSubCategories: Set<string> =  new Set<string>()
    const pendingPaymentMethods: Set<string> =  new Set<string>()

    for (const expense of (data as LocalExpense[])) {
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
        date: rawExpense.date,
        category_id: categoryMatch.id,
        sub_category_id: subCategoryMatch?.id || null,
        tags: rawExpense.tags,
        payment_method_id: paymentMethodMatch.id,
        price: rawExpense.price
      })
    }

    return expensesDraft
  }

  useEffect(() => {
    setLoading(query.isLoading || createMutation.isLoading)
  }, [query.isLoading, createMutation.isLoading])

  return (
    {
      serverExpense,
      localExpenses,
      isLoading,
      fetchAllExpenses,
      createExpenses,
      setPropValue,
      formatExpensesForUpload
    }
  )
}

export default useExpense