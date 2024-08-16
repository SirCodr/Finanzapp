import { HttpAdapter } from "../../http";
import { ExpenseCreationDataRequired, LocalExpense, ServerExpense } from "../../types/expenses";
import { httpResponse } from "../../types/http";
import { fetchAllPaymentMethods } from "../payment-methods";
import { fetchAllExpenseCategories } from "./categories";
import { fetchAllExpenseSubCategories } from "./sub_categories";

export async function fetchAllExpensesFromServer(): Promise<httpResponse<LocalExpense[]>> {
  return await new HttpAdapter().get('expenses')
}


export async function postExpenses(expenses: ServerExpense[]) {
  return await new HttpAdapter().post('upload-expenses', expenses)
}

export async function fetchAllCreationDataRequiredFromServer(): Promise<httpResponse<ExpenseCreationDataRequired>> {
  const categories = await fetchAllExpenseCategories().then(res => res.data)
  const subCategories = await fetchAllExpenseSubCategories().then(res => res.data)
  const paymentMethods = await fetchAllPaymentMethods().then(res => res.data)

  return {
    count: null,
    error: null,
    status: 200,
    statusText: 'Okay',
    data: {
      categories,
      subCategories,
      paymentMethods
    },
  }
}