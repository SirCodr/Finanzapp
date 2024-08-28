import { HttpAdapter } from "../../http";
import { httpResponse } from "../../types/http";
import { ServerPaymentMethod } from "../../types/payment-methods";

export async function fetchAllPaymentMethods(): Promise<httpResponse<ServerPaymentMethod[]>> {
  return await new HttpAdapter().get('payment-methods')
}

export async function postPaymentMethods(paymentMethods:ServerPaymentMethod[]): Promise<httpResponse<ServerPaymentMethod[]>> {
  const { data } = await new HttpAdapter().post('payment-methods', paymentMethods)
  return data
}