import { toast } from "sonner"
import { LocalIncome, ServerIncome } from "../types/income"
import { createIncomeCategories, fetchAllIncomeCategories } from "../services/incomes/categories"
import { fetchAllIncomeSubCategories } from "../services/incomes/sub_categories"
import { createPaymentAccounts, fetchAllPaymentAccounts } from "../services/payment-accounts"
import { getFormattedIncomesforUpload } from "../utils/incomes"

const useIncome = () => {
  async function formatForUpload (data: unknown[]) {
    if (!data || !data.length) throw Error('No hay información recibida')

    const incomesDraft: ServerIncome[] = []
    const pendingIncomes: LocalIncome[] = []

    const categories = await fetchAllIncomeCategories()
    const subCategories = await fetchAllIncomeSubCategories()
    const paymentAccounts = await fetchAllPaymentAccounts()

    const pendingCategories: Set<string> =  new Set<string>()
    //const pendingSubCategories: Set<string> =  new Set<string>()
    const pendingpaymentAccounts: Set<string> =  new Set<string>()

    for (const income of (data as unknown[][])) {
      const rawIncome = {
          date: income[0] as string,
          category: income[1] as string,
          subCategory: income[2] as string,
          description: income[3] as string,
          paymentAccount: income[4] as string,
          amount: income[5] as string
      }

      if (!rawIncome.category || !rawIncome.paymentAccount || !rawIncome.amount || !rawIncome.date) throw Error('Campo invalido')

      const formattedExpenseFound = getFormattedIncomesforUpload({
        rawIncome,
        serverCategories: categories.data,
        serverSubcategories: subCategories.data,
        serverPaymentAccounts: paymentAccounts.data
      })

      if (formattedExpenseFound) {
        incomesDraft.push(formattedExpenseFound)
      }

      if (!formattedExpenseFound?.categoryId && !pendingCategories.has(rawIncome.category)) {
        pendingCategories.add(rawIncome.category)
      }

      if (!formattedExpenseFound?.paymentAccountId && !pendingpaymentAccounts.has(rawIncome.paymentAccount)) {
        pendingpaymentAccounts.add(rawIncome.paymentAccount)
      }

      if (!formattedExpenseFound?.categoryId || !formattedExpenseFound?.paymentAccountId) {
        pendingIncomes.push(rawIncome)
        continue
      }
    }

    if (pendingCategories.size) {
      const newIncomeCategories = await createIncomeCategories(Array.from(pendingCategories).map(item => ({ name: item })))
      categories.data = [...categories.data, ...newIncomeCategories.data ]
    }

    if (pendingpaymentAccounts.size) {
      const newpaymentAccounts = await createPaymentAccounts(Array.from(pendingpaymentAccounts).map(item => ({ name: item })))
      paymentAccounts.data = [...paymentAccounts.data, ...newpaymentAccounts.data ]
    }

    for (const expense of pendingIncomes) {
      const categoryMatch = categories.data.find(category => expense.category.trim().length && category.name === expense.category)
      const subCategoryMatch = subCategories.data.find(subCategory => expense.subCategory.trim().length && subCategory.name === expense.subCategory && categoryMatch?.id === subCategory.category_id)
      const paymentMethodMatch = paymentAccounts.data.find(paymentAccount =>paymentAccount.name.trim().length && paymentAccount.name === expense.paymentAccount)

      if (!categoryMatch?.id || !paymentMethodMatch?.id) {
        toast.error('Error')
        continue
      }

      incomesDraft.push({
        date: expense.date,
        categoryId: categoryMatch.id,
        subCategoryId: subCategoryMatch?.id || null,
        description: expense.description,
        paymentAccountId: paymentMethodMatch.id,
        amount: expense.amount
      })
    }

    return incomesDraft
  }
  return {
    formatForUpload
  }
}
 
export default useIncome;