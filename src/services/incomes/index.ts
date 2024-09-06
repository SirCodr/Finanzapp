import { HttpAdapter } from "../../http";

export async function fetchAll() {
  return await new HttpAdapter().get('incomes')
}