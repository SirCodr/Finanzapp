import { LocalIncome, ServerIncome, ServerIncomeCategory, ServerIncomeSubCategory } from "../types/income";
import { ServerPaymentAccount } from "../types/payment-accounts";

export function isLocalIncome(expense: unknown): expense is LocalIncome {
  return (expense as LocalIncome).amount !== undefined;
}

export function getFormattedIncomesforUpload({
    rawIncome,
    serverCategories,
    serverSubcategories,
    serverPaymentAccounts
  }: {
    rawIncome: LocalIncome
    serverCategories: ServerIncomeCategory[]
    serverSubcategories: ServerIncomeSubCategory[]
    serverPaymentAccounts: ServerPaymentAccount[]
  }): ServerIncome | null {
    const categoryMatch = serverCategories.find(
      (category) =>
        rawIncome.category.trim().length &&
        category.name === rawIncome.category
    )
    const subCategoryMatch = serverSubcategories.find(
      (subCategory) =>
        rawIncome.subCategory.trim().length &&
        subCategory.name === rawIncome.subCategory &&
        categoryMatch?.id === subCategory.category_id
    )
    const paymentAccountMatch = serverPaymentAccounts.find(
      (paymentAccount) =>
        paymentAccount.name.trim().length &&
        paymentAccount.name === rawIncome.paymentAccount
    )

    if (!categoryMatch?.id || !paymentAccountMatch?.id) return null

    return {
      date: rawIncome.date,
      description: rawIncome.description,
      categoryId: categoryMatch.id,
      subCategoryId: subCategoryMatch?.id || null,
      paymentAccountId: paymentAccountMatch.id,
      amount: rawIncome.amount
    }
}