import http from "../../http";
import { Expense } from "../../types/expenses";
import { httpResponse } from "../../types/http";

export async function fetchAllExpenses(): Promise<httpResponse<Expense[]>> {
  return await http.get('expenses')
}