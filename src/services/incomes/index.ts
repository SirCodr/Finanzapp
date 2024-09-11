import { HttpAdapter } from "../../http";
import { ServerIncome } from "../../types/income";

export async function fetchAll() {
  return await new HttpAdapter().get('incomes')
}

export async function create(data: ServerIncome[]) {
  return await new HttpAdapter().post('incomes', data)
}