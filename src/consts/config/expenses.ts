import { ColumnProps } from "primereact/column";
import { formatCurrency } from "../../utils/currency";

export const EXPENSES_TABLE_COLUMNS: ColumnProps[] = [
  {
    field: 'date',
    header: 'Fecha',
    sortable: true
  },
  {
    field: 'category',
    header: 'Categoria',
    sortable: true
  },
  {
    field: 'subCategory',
    header: 'Sub categoria',
    sortable: true
  },
  {
    field: 'paymentMethod',
    header: 'Metodo de pago',
    sortable: true
  },
  {
    field: 'price',
    header: 'Precio',
    body: ({ price }: { price: string | number }) => formatCurrency(price),
    sortable: true
  }
]