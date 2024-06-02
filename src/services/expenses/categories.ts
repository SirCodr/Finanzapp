import http from "../../http";
import { ServerExpenseCategory } from "../../types/expenses";
import { httpResponse } from "../../types/http";

export async function fetchAllExpenseCategories(): Promise<httpResponse<ServerExpenseCategory[]>> {
  return await http.get('expenses/categories')
}