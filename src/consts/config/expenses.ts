import { ColumnProps } from "primereact/column";
import { formatCurrency } from "../../utils/currency";

export const EXPENSES_TABLE_COLUMNS: ColumnProps[] = [
  {
    field: 'date',
    sortable: true
  },
  {
    field: 'category',
    sortable: true
  },
  {
    field: 'subCategory',
    header: 'Sub category',
    sortable: true
  },
  {
    field: 'paymentMethod',
    header: 'Payment Method',
    sortable: true
  },
  {
    field: 'price',
    body: ({ price }: { price: string | number }) => formatCurrency(price),
    sortable: true
  }
]