import http from "../../http";
import { httpResponse } from "../../types/http";
import { ServerPaymentMethod } from "../../types/payment-methods";

export async function fetchAllPaymentMethods(): Promise<httpResponse<ServerPaymentMethod[]>> {
  return await http.get('payment-methods')
}