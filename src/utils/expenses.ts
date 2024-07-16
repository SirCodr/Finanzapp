import { LocalExpense, ServerExpense, ServerExpenseCategory, ServerExpenseSubCategory } from "../types/expenses";
import { ServerPaymentMethod } from "../types/payment-methods";

export function isLocalExpense(expense: unknown): expense is LocalExpense {
  return (expense as LocalExpense).price !== undefined;
}

export function getFormattedExpensesforUpload({
    rawExpense,
    serverCategories,
    serverSubcategories,
    serverPaymentMethods
  }: {
    rawExpense: LocalExpense
    serverCategories: ServerExpenseCategory[]
    serverSubcategories: ServerExpenseSubCategory[]
    serverPaymentMethods: ServerPaymentMethod[]
  }): ServerExpense | null {
    const categoryMatch = serverCategories.find(
      (category) =>
        rawExpense.category.trim().length &&
        category.name === rawExpense.category
    )
    const subCategoryMatch = serverSubcategories.find(
      (subCategory) =>
        rawExpense.subCategory.trim().length &&
        subCategory.name === rawExpense.subCategory &&
        categoryMatch?.id === subCategory.category_id
    )
    const paymentMethodMatch = serverPaymentMethods.find(
      (paymentMethod) =>
        paymentMethod.name.trim().length &&
        paymentMethod.name === rawExpense.paymentMethod
    )

    if (!categoryMatch?.id || !paymentMethodMatch?.id) return null

    return {
      date: rawExpense.date,
      description: rawExpense.description,
      category_id: categoryMatch.id,
      sub_category_id: subCategoryMatch?.id || null,
      tags: rawExpense.tags,
      payment_method_id: paymentMethodMatch.id,
      price: rawExpense.price
    }
}