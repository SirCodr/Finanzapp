import { HttpAdapter } from '../../http'
import { httpResponse } from '../../types/http'
import { ServerIncomeCategory } from '../../types/income'

export async function fetchAllIncomeCategories(): Promise<
  httpResponse<ServerIncomeCategory[]>
> {
  return await new HttpAdapter().get('income-categories')
}

export async function createIncomeCategories(
  incomeCategories: ServerIncomeCategory[]
): Promise<httpResponse<ServerIncomeCategory[]>> {
  return await new HttpAdapter().post(
    'income-categories',
    incomeCategories
  )
}
