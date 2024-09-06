import { ColumnProps } from "primereact/column";
import { formatCurrency } from "../../utils/currency";

export const INCOMES_TABLE_COLUMNS: ColumnProps[] = [
  {
    field: 'date',
    header: 'Fecha',
    sortable: true
  },
  {
    field: 'category_id',
    header: 'Categoria',
    sortable: true
  },
  {
    field: 'sub_category_id',
    header: 'Sub categoria',
    sortable: true
  },
  {
    field: 'payment_account_id',
    header: 'Metodo de pago',
    sortable: true
  },
  {
    field: 'amount',
    header: 'Precio',
    body: ({ amount }: { amount: string | number }) => formatCurrency(amount),
    sortable: true
  }
]