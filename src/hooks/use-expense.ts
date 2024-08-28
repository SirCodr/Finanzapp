import { useEffect, useMemo, useState } from "react"
import { LocalExpense, ServerExpense } from "../types/expenses"
import { fetchAllCreationDataRequiredFromServer, fetchAllExpensesFromServer, postExpenses } from "../services/expenses"
import useExpensesStore from "../store/expenses"
import { useMutation, useQuery } from "react-query"
import { httpResponse } from "../types/http"
import { snakeArrayToCamel } from "../utils"
import { fetchAllExpenseCategories, postExpenseCategories } from "../services/expenses/categories"
import { fetchAllExpenseSubCategories } from "../services/expenses/sub_categories"
import { fetchAllPaymentMethods, postPaymentMethods } from "../services/payment-methods"
import { toast } from "sonner"
import { getFormattedExpensesforUpload } from "../utils/expenses"
import { DEFAULT_SERVER_EXPENSE } from "../consts"

const useExpense = () => {
  const [serverExpense, setServerExpense] = useState<ServerExpense>(DEFAULT_SERVER_EXPENSE)
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const { expenses: localExpenses } = useExpensesStore()
  const [ setLocalExpenses ]  = useExpensesStore(state => [state.setExpenses])

  const query = useQuery({
    queryKey: ['expenses'],
    queryFn: fetchAllExpensesFromServer,
    enabled: false,
    onSuccess: (res: httpResponse<LocalExpense[]>) => {
      if (res.data) {
        const formattedData = snakeArrayToCamel(res.data)
        setLocalExpenses(formattedData)
      }
    }
  })

  const creationDataRequiredQuery = useQuery({
    queryKey: ['creation-data-required'],
    queryFn: fetchAllCreationDataRequiredFromServer,
    enabled: false
  })

  const createMutation = useMutation(async (expenses: ServerExpense[]) => await postExpenses(expenses), {
    onSuccess: () => setSuccess(true),
    onError: () => setSuccess(false)
  } )

  const creationDataRequired = useMemo(() => creationDataRequiredQuery.data?.data, [creationDataRequiredQuery.data])

  async function fetchAllExpenses (): Promise<void> {
    await query.refetch()
  }

  async function fetchAllCreationDataRequired (): Promise<void> {
    await creationDataRequiredQuery.refetch()
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

    const expensesDraft: ServerExpense[] = []
    const pendingExpenses: LocalExpense[] = []

    const categories = await fetchAllExpenseCategories()
    const subCategories = await fetchAllExpenseSubCategories()
    const paymentMethods = await fetchAllPaymentMethods()

    const pendingCategories: Set<string> =  new Set<string>()
    //const pendingSubCategories: Set<string> =  new Set<string>()
    const pendingPaymentMethods: Set<string> =  new Set<string>()

    for (const expense of (data as unknown[][])) {
      const rawExpense = {
          date: expense[0] as string,
          category: expense[1] as string,
          subCategory: expense[2] as string,
          description: expense[3] as string,
          tags: (expense[4] as string)?.split(',') || [],
          paymentMethod: expense[5] as string,
          price: expense[6] as string
      }

      if (!rawExpense.category || !rawExpense.paymentMethod || !rawExpense.price || !rawExpense.date) throw Error('Campo invalido')

      const formattedExpenseFound = getFormattedExpensesforUpload({
        rawExpense,
        serverCategories: categories.data,
        serverSubcategories: subCategories.data,
        serverPaymentMethods: paymentMethods.data
      })

      if (formattedExpenseFound) {
        expensesDraft.push(formattedExpenseFound)
      }

      if (!formattedExpenseFound?.category_id && !pendingCategories.has(rawExpense.category)) {
        pendingCategories.add(rawExpense.category)
      }

      if (!formattedExpenseFound?.payment_method_id && !pendingPaymentMethods.has(rawExpense.paymentMethod)) {
        pendingPaymentMethods.add(rawExpense.paymentMethod)
      }

      if (!formattedExpenseFound?.category_id || !formattedExpenseFound?.payment_method_id) {
        pendingExpenses.push(rawExpense)
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
        description: expense.description,
        tags: expense.tags,
        payment_method_id: paymentMethodMatch.id,
        price: expense.price
      })
    }

    return expensesDraft
  }

  useEffect(() => {
    setLoading(query.isLoading || createMutation.isLoading || creationDataRequiredQuery.isLoading)
  }, [query.isLoading, createMutation.isLoading, creationDataRequiredQuery.isLoading])

  return (
    {
      serverExpense,
      localExpenses,
      creationDataRequired,
      isLoading,
      isSuccess,
      fetchAllExpenses,
      fetchAllCreationDataRequired,
      createExpenses,
      setPropValue,
      formatExpensesForUpload
    }
  )
}

export default useExpense