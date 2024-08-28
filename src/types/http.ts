export interface httpResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
