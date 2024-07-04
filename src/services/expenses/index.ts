import http from "../../http";
import { LocalExpense, ServerExpense } from "../../types/expenses";
import { httpResponse } from "../../types/http";

export async function fetchAllExpensesFromServer(): Promise<httpResponse<LocalExpense[]>> {
  return await http.get('expenses')
}


export async function postExpenses(expenses: ServerExpense[]) {
  await http.post('upload-expenses', expenses)
}