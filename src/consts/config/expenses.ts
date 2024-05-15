import { ColumnProps } from "primereact/column";
import { formatCurrency } from "../../utils/currency";

export const EXPENSES_TABLE_COLUMNS: ColumnProps[] = [
  {
    field: 'date'
  },
  {
    field: 'category'
  },
  {
    field: 'paymentMethod',
    header: 'Payment Method'
  },
  {
    field: 'price',
    body: ({ price }: { price: string | number }) => formatCurrency(price)
  }
]