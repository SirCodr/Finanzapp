export interface LocalIncome {
  category: string
  subCategory: string
  description: string
  paymentAccount: string
  amount: string
  date: string
}

export interface ServerIncome {
  categoryId: number | null;
  createdAt?: string;
  date: string |null; 
  id?: number;
  description: string | null;
  paymentAccountId: number;
  amount: string;
  subCategoryId: number | null;
}

export interface ServerIncomeCategory {
  id?: number
  name: string
}

export interface ServerIncomeSubCategory {
  id?: number
  name: string
  category_id?: number
}