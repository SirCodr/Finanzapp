import http from "../../http";
import { ServerExpenseCategory } from "../../types/expenses";
import { httpResponse } from "../../types/http";

export async function fetchAllExpenseCategories(): Promise<httpResponse<ServerExpenseCategory[]>> {
  return await http.get('expenses/categories')
}

export async function postExpenseCategories(expenseCategories:ServerExpenseCategory[]): Promise<httpResponse<ServerExpenseCategory[]>> {
  const { data } = await http.post('expenses/categories',expenseCategories)
  return data
}