import { HttpAdapter } from "../../http";
import { httpResponse } from "../../types/http";
import { ServerIncomeSubCategory } from "../../types/income";

export async function fetchAllIncomeSubCategories(): Promise<httpResponse<ServerIncomeSubCategory[]>> {
  return await new HttpAdapter().get('income-sub-categories')
}