import { HttpAdapter } from "../../http";
import { httpResponse } from "../../types/http";
import { ServerPaymentAccount } from "../../types/payment-accounts";

export async function fetchAllPaymentAccounts(): Promise<httpResponse<ServerPaymentAccount[]>> {
  return await new HttpAdapter().get('payment-accounts')
}

export async function createPaymentAccounts(paymentAccounts:ServerPaymentAccount[]): Promise<httpResponse<ServerPaymentAccount[]>> {
  return await new HttpAdapter().post('payment-accounts', paymentAccounts)
}