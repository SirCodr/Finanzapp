import { HttpAdapter } from "../../http";
import { ServerIncome } from "../../types/income";
import { fetchAllPaymentAccounts } from "../payment-accounts";
import { fetchAllIncomeCategories } from "./categories";
import { fetchAllIncomeSubCategories } from "./sub_categories";

export async function fetchAll() {
  return await new HttpAdapter().get('incomes')
}

export async function createIncomes(data: ServerIncome[]) {
  return await new HttpAdapter().post('incomes', data)
}

export async function fetchAllIncomeCreationOptions() {
  const categories = await fetchAllIncomeCategories().then(res => res.data)
  const subCategories = await fetchAllIncomeSubCategories().then(res => res.data)
  const paymentAccounts = await fetchAllPaymentAccounts().then(res => res.data)

  return {
    success: true,
    message: 'Okay',
    data: {
      categories,
      subCategories,
      paymentAccounts
    },
  }
}