import http from "../../http";
import { ServerExpenseSubCategory } from "../../types/expenses";
import { httpResponse } from "../../types/http";

export async function fetchAllExpenseSubCategories(): Promise<httpResponse<ServerExpenseSubCategory[]>> {
  return await http.get('expenses/sub_categories')
}