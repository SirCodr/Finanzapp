import { HttpAdapter } from "../../http";
import { ServerExpenseCategory } from "../../types/expenses";
import { httpResponse } from "../../types/http";

export async function fetchAllExpenseCategories(): Promise<httpResponse<ServerExpenseCategory[]>> {
  return await new HttpAdapter().get('expenses/categories')
}

export async function postExpenseCategories(expenseCategories:ServerExpenseCategory[]): Promise<httpResponse<ServerExpenseCategory[]>> {
  const { data } = await new HttpAdapter().post('expenses/categories',expenseCategories)
  return data
}