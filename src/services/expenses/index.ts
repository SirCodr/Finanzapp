import http from "../../http";
import { Expense, ServerExpense } from "../../types/expenses";
import { httpResponse } from "../../types/http";

export async function fetchAllExpenses(): Promise<httpResponse<Expense[]>> {
  return await http.get('expenses')
}


export async function postExpenses(expenses: ServerExpense[]) {
  await http.post('upload-expenses', expenses)
}