import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useState } from 'react';
import { RENDER_TABLE_COLUMNS } from '../../consts/config/expenses';
import { generateRandomKey } from '../../utils';

function ExpensesListView() {
  const PRODUCTS = [
  {
    "category": "Food",
    "subCategory": "Groceries",
    "tags": ["Groceries", "Food"],
    "description": "Weekly grocery shopping",
    "paymentMethod": "Credit Card",
    "price": "50.00",
    "date": "2024-05-12"
  },
  {
    "category": "Transportation",
    "subCategory": "Public Transport",
    "tags": ["Transportation"],
    "description": "Bus fare to work",
    "paymentMethod": "Cash",
    "price": "2.50",
    "date": "2024-05-11"
  },
  {
    "category": "Entertainment",
    "subCategory": "Movies",
    "tags": ["Entertainment", "Movies"],
    "description": "Movie night with friends",
    "paymentMethod": "Debit Card",
    "price": "15.00",
    "date": "2024-05-10"
  },
  {
    "category": "Utilities",
    "subCategory": "Electricity",
    "tags": ["Utilities", "Electricity"],
    "description": "Monthly electricity bill",
    "paymentMethod": "Direct Debit",
    "price": "80.00",
    "date": "2024-05-09"
  },
  {
    "category": "Healthcare",
    "subCategory": "Doctor's Appointment",
    "tags": ["Healthcare", "Doctor"],
    "description": "Routine checkup",
    "paymentMethod": "Health Insurance",
    "price": "0.00",
    "date": "2024-05-08"
  }
]

  const [products] = useState(PRODUCTS);

  return (
    <div className='card'>
      <DataTable value={products} tableStyle={{ minWidth: '50rem' }} scrollable>
        {
          RENDER_TABLE_COLUMNS.map((item, index) => {
            const { column, text } = item
            return (
              <Column key={generateRandomKey(index)} field={column} header={text ?? column} headerClassName='capitalize'></Column>
            )
          })
        }
      </DataTable>
    </div>
  )
}

export default ExpensesListView
